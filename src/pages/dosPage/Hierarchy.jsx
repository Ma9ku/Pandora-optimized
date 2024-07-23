import React, { useState, useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import axios from 'axios';
import { dossierURL } from '../../data/dossier';
import './hierarchy.scss';
import downloadIcon from './down-arrow-download-svgrepo-com.svg';
import { dirIcon, baseIcon } from '../../images/icons';
import { hierachies } from './HierarchyLocal/hierarhyLocal';
import html2canvas from 'html2canvas';

function HierarchyChart({ iin }) {
  const chartRef = useRef(null);
  const [data, setData] = useState({});
  const exportButtonRef = useRef(null);

  useEffect(() => {
    let mounted = true; // To avoid setting state on unmounted component

    const fetchData = async () => {
      if (iin) {
        let response;
        try {
          if (iin.length === 6) {
            response = hierachies.find(x => x.iin.startsWith(iin));
          } else {
            response = await axios.get(`${dossierURL}hierarchy`, { params: { iin } });
            response = response.data;
          }

          if (mounted && response) {
            setData(response);
          }
        } catch (error) {
          console.error("Fetching hierarchy data failed:", error);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false; // Avoids setting state after component unmount
    };
  }, [iin]);

  useEffect(() => {
    if (!Object.keys(data).length) {
        return;
    }

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );
    const series = container.children.push(
      am5hierarchy.Tree.new(root, {
        singleBranchOnly: false,
        paddingTop: 140,
        paddingBottom: 120,
        downDepth: 1,
        initialDepth: 10,
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
      })
    );
    series.nodes.template.setAll({
      toggleKey: 'none',
      cursorOverStyle: 'pointer',
    });
    series.circles.template.setAll({
      radius: 45,
      fill: '#001628',
      strokeWidth: 7,
    });
    
    series.outerCircles.template.setAll({
      radius: 45,
      fill: '#001628',
    });
    series.links.template.setAll({
      fill: '#001628',
      stroke: '#001628',
    });
  
    series.circles.template.adapters.add('fill', function(fill, target) {
      if (target.dataItem?.dataContext?.relation === 'Основной') {
        return 'green';
      }
  
      return '#001628';
    });
    series.circles.template.adapters.add('stroke', function(fill, target) {
      if (target.dataItem?.dataContext?.relation === 'Основной') {
        return 'green';
      }
      if (target.dataItem?.dataContext?.haveRisk) {
        return 'red';
      }
      return '#001628';
    });
    series.outerCircles.template.adapters.add('stroke', function(fill, target) {
      if (target.dataItem.get('relation') === 'Основной') {
        return 'green';
      }
      if (target.dataItem?.dataContext?.haveRisk) {
        return 'red';
      }
      return '#001628';
    });
    series.outerCircles.template.adapters.add('fill', function(fill, target) {
      if (target.dataItem.get('relation') === 'Основной') {
        return 'green';
    }
    if (target.dataItem?.dataContext?.haveRisk) {
        return 'red';
    }
    return '#001628';
});

    series.nodes.template.set('tooltipText', '{name} ');
    series.nodes.template.setup = function(target) {
      target.events.on('dataitemchanged', function(ev) {
        const { isDirector } = ev.target.dataItem.dataContext;
        const isPhoto = ev.target.dataItem.dataContext.photo;
        let photo = '';
        if (ev.target.dataItem.dataContext.photo) {
          photo = `data:image/png;base64,${isPhoto}`;
        } else {
          photo = baseIcon;
        }
        if (isDirector && isPhoto) {
          target.children.push(
            am5.Picture.new(root, {
              width: 55,
              height: 55,
              centerX: am5.percent(50),
              centerY: am5.percent(200),
              fill: '#ffffff',
              src: dirIcon,
            })
          );
        } else if (ev.target.dataItem.dataContext.photo) {
            target.children.push(
                am5.Picture.new(root, {
                    width: 57,
                    height: 76,
                  centerX: am5.percent(50),
                  centerY: am5.percent(50),
                  fill: '#ffffff',
                  src: `data:image/png;base64,${isPhoto}`,
                })
              );
        } else {
          target.children.push(
            am5.Picture.new(root, {
                width: 55,
                height: 55,
              centerX: am5.percent(50),
              centerY: am5.percent(50),
              fill: '#ffffff',
              src: photo,
            })
          );
          if (isDirector)
            target.children.push(
              am5.Picture.new(root, {
                width: 55,
                height: 55,
                centerX: am5.percent(50),
                centerY: am5.percent(200),
                fill: '#ffffff',
                src: dirIcon,
              })
            );
        }
      });
    };
  
    series.labels.template.setAll({
        fill: am5.color('#888888'),
        fontSize: 10,
        y: 90,
        fontWeight: 'regular',
        oversizedBehavior: 'wrap-no-break',
    });

    series.data.setAll([data]);
    series.set('selectedDataItem', series.dataItems[0]);

    series.appear(1000, 100);


    
    return () => {
        root.dispose();
    };
}, [data]);
  const exportChartAsImage = () => {
    html2canvas(chartRef.current, {
        // Use ignoreElements to exclude specific elements
        ignoreElements: (element) => {
            // Exclude the element if it is or is inside the export button
            return element === exportButtonRef.current || exportButtonRef.current.contains(element);
        }
    }).then((canvas) => {
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement('a');
        link.download = 'chart-export.png';
        link.href = image;
        link.click();
    });
};
  return (
    <>
      {Object.keys(data).length ? (
        <div className='schema-risks'>
          <div ref={chartRef} style={{ textAlign: 'center', width: '100%', height: '85vh' }}></div>
          <img ref={exportButtonRef} onClick={exportChartAsImage} src={downloadIcon} alt="Download" />
        </div>
      ) : null}
    </>
  );
}

export default HierarchyChart;
