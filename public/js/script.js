async function deletePost(postId, userId) {

    try {
        const response = await fetch(`http://localhost:3000/delete/${postId}`, {
            method: 'DELETE'
           
    });
    if (response) {
        window.location.href = `http://localhost:3000/profile/${userId}`;
    }
    }
    catch (error) {
            console.error('Error:', error);
        }
}


