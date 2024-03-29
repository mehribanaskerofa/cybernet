var postsUrl='https://jsonplaceholder.typicode.com/posts';
var postsCommentUrl='https://jsonplaceholder.typicode.com/comments';

  
 var postsData=[];
 var postsCommentData=[];

//comments
 fetch(postsCommentUrl)
  .then(response => response.json())
  .then(data => {
    postsCommentData.push(data);
  })
  .catch(error => console.error('Error:', error));

//posts
  fetch(postsUrl)
  .then(response => response.json())
  .then(data => {
      const tableData = document.getElementById('posts');

      data.forEach((data,index) => {
          const row = document.createElement('tr');
          const body = data.body.length > 30 ? data.body.substring(0, 30) + '...' : data.body;
          const comment = postsCommentData[0][index]; 
          
          row.innerHTML = `
          <td>${data.id}</td>
          <td>${data.title}</td>
          <td>${body}</td>
          <td>${comment.body}</td>
      `;
          tableData.appendChild(row);
      });
  })
  .catch(error => console.error('Error:', error));




