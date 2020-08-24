const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

//Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  return data;
}

//Show posts in DOM
async function showPosts() {
    const posts = await getPosts();
    
    posts.forEach(p => {
        const post = document.createElement('div');
        post.classList.add('post');
        post.innerHTML = `
        <div class="number">${p.id}</div>
        <div class="post-info">
            <h2 class="post-title">${p.title}</h2>
            <p class="post-body">${p.body}</p>
        </div>
        `;
        postsContainer.appendChild(post);
    });
}

// Show loader and fetch more posts
function showLoading() {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
            page++;
            showPosts();
    },1000);

}

//Filter posts by Input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);

