const urlBase = 'https://jsonplaceholder.typicode.com/posts'//url a usar
let posts = []//iniciamos los posteos

function GetData(){//Este get trae toda la info de la url
    fetch(urlBase)
    .then(res => res.json())
    .then(data=>{
        posts = data
        RenderPostList()

    })
    .catch(error => console.error('Error al llamar a la API', error))
}
function RenderPostList(){
    const postList = document.getElementById("postList");//accedemos al elemento
    postList.innerHTML = ''; //lo dejamoms vacio

    posts.forEach(post =>{
        const listItem = document.createElement('li');//creamos la lista
        listItem.classList.add('postItem');//para darle estilo en CSS

        listItem.innerHTML = `
            <strong>${post.title}</strong> 
            <p>${post.body}</p>
            <button onclick="editpost(${post.id})">Editar</button>
            <button onclick="deletePost(${post.id})">Borrar</button>

            <div id="editForm-${post.id}" class="editForm" style="display:none">
            <label for="editTable">Titulo:</label>
            <input type="text" id="editTitle-${post.id}" value="${post.title}" required></input>

            <label for="editBody">Comentario:</label>
            <textarea id="editBody-${post.id}" required></textarea>
            </div>

            <button onclick="updatePost(${post.id})">Actualizar</button>

        `//marcando dentro de un elemento del post
        postList.appendChild(listItem) //para que lo agregue por el foreach
    })
}
function PostData(){
    const postTitle = document.getElementById('postTitle').value;
    const postBody = document.getElementById('postBody').value;
    
    //En el caso de que no se llenen los campos pedidos
    if(postTitle.trim() ==''|| postBody.trim() ==''){
        alert('Los campos son obligatorioss.')
        return;
    }

    fetch(urlBase, {
        method: 'Post',
        body: JSON.stringify({
            title: postTitle,
            body: postBody,
            userId: 1,
        }),
        headers:{
            'Content-type':'application/json; charset=UTF-8',
        },

    })
    .then(res => res.json())
    .then(data => {
        posts.push(data)
        //Sumamos esto al posteo
        RenderPostList();   
        postTitle = ''
        postBody = ''
    })
    //Por si pasa algo que lo muestre
    .catch(error =>console.error('Error al querer crear posteo: ', error))
}