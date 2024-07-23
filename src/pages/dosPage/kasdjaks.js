import React, { useLayoutEffect, useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import { Spin } from 'antd';
import { router } from 'umi';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import JournalHeader from '@/components/JournalHeader';
import { getUrlParams } from '@/utils/helpers';
import { getTreeNodes } from '@/services/api';
import { baseIcon, dirIcon } from './icon';

export default function App() {
const [data, setData] = useState(null);

const { iin } = getUrlParams();
useLayoutEffect(() => {
if (data) {
const root = am5.Root.new('chartdiv');

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
  series.circles.template.events.on('click', function(ev) {
    const iinEv = ev.target?.dataItem?.dataContext?.iin;
    if (iinEv) router.push(`/dossier?iin=${iinEv}`);
    if (ev.target?.dataItem?.dataContext?.isDirector)
      router.replace(`/tree-family-detail?iin=${iinEv}`);
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
  am5plugins_exporting.Exporting.new(root, {
    menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    dataSource: data,
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
            width: 65,
            height: 65,
            centerX: am5.percent(50),
            centerY: am5.percent(50),
            fill: '#ffffff',
            src: `data:image/png;base64,${isPhoto}`,
          })
        );
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
        fill: am5.color(0x000000),
        fontSize: 10,
        y: 90,
        fontWeight: 'bold',
        oversizedBehavior: 'wrap-no-break',
    });

    series.data.setAll([data]);
    series.set('selectedDataItem', series.dataItems[0]);

    series.appear(1000, 100);
}
}, [data]);

useEffect(() => {
getTreeNodes(iin)
.then(d => {
setData(d);
})
.catch(e => {
console.log(e);
});
}, []);

return (
<>
<JournalHeader backBtn={false} title={Визуализация данных по ИИН: ${iin}} />
<div className="fieldArrayDiv" style={{ textAlign: 'center' }}>
{data ?

: }

</>
);
}