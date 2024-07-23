export const uploadFile = async (file, label, relationshipType) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`/create_node/label=${label}/`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('File upload failed');
        }
    } catch (error) {
        return { message: error.message };
    }
};
