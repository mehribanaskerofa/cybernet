const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

let postsData = [];
let commentsData = [];

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function fetchDataAndUpdateTable() {
  try {
    [postsData, commentsData] = await Promise.all([fetchData(postsUrl), fetchData(commentsUrl)]);

    const tableData = document.getElementById('posts');

    postsData.forEach(post => {
      const row = document.createElement('tr');
      const body = post.body.length > 30 ? post.body.substring(0, 30) + '...' : post.body;

      const postComments = commentsData.filter(comment => comment.postId === post.id).slice(0, 3);

      const commentsList = postComments.map(comment => `<li>${comment.body}</li>`).join('');

      row.innerHTML = `
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td>${body}</td>
          <td><ul>${commentsList}</ul></td>
      `;

      tableData.appendChild(row);
    });
  } catch (error) {
    console.error('Hata:', error);
  }
}

fetchDataAndUpdateTable();
