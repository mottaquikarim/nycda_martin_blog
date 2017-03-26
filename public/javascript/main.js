(function() { // protect the lemmings

	function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};
			request.send();
		});
	} // GET

	function POST(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('POST', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function PUT(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('PUT', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function DELETE(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('DELETE', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // DELETE

	function render(blogItems) {
		const container = document.querySelector('.js-bloglist');
		container.innerHTML = '';
		for (const blogItem of blogItems) {
			
			const h4 = document.createElement('h4');
			h4.innerHTML = `
                     <span class="js-title-text">${blogItem.data.blog}</span>    
			`;

			const editBtn = document.createElement('button');
			editBtn.classList.add('glyphicon', 'glyphicon-edit', 'js-edit');
			editBtn.style.float = 'right';


			const closeBtn = document.createElement('button');
			closeBtn.classList.add('glyphicon', 'glyphicon-remove', 'js-remove');
			closeBtn.style.float = 'right';


			h4.appendChild(closeBtn);
			h4.appendChild(editBtn);


			h4.classList.add('list-group-item', 'bloglist-item');

			container.appendChild(h4);

			const li = document.createElement('div');
			li.innerHTML = `
                     <div  class="js-content-text">${blogItem.data.blogText}</div>  
			`;


			li.classList.add('list-group-item', 'bloglist-item');

			// const textarea = 

			const div = document.createElement('div');
			div.appendChild(h4);
			div.appendChild(li);
			container.appendChild(div);

			const editDiv = document.createElement('div');
			editDiv.innerHTML = `
				<h4 class="list-group-item bloglist-item">
					<input type="text" style="border: none;" class="js-title-text-edit" value="${blogItem.data.blog}" />
				</h4>
				<div class='list-group-item bloglist-item'>
					<textarea class="js-content-text-edit">${blogItem.data.blogText}</textarea>
				</div>
			`;
			editDiv.style.display = 'none';

			const saveBtn = document.createElement('button');
			saveBtn.classList.add('glyphicon', 'glyphicon-check', 'js-save');
			saveBtn.style.float = 'right';

			editDiv.querySelector('.bloglist-item').appendChild(saveBtn)

			div.appendChild(editDiv);

			closeBtn.addEventListener('click', (e) => {
				DELETE('/api/blog/' + blogItem.id).then((data) => {
					console.log('delete complete')
					render(data)
				});
			});

			editBtn.addEventListener('click', (e) => {
				editDiv.style.display = 'block';
				h4.style.display = 'none';
				li.style.display = 'none';

			});

			saveBtn.addEventListener('click', (e) => {
				PUT('/api/blog/' + blogItem.id, {
					blog: editDiv.querySelector('.js-title-text-edit').value,
					blogText: editDiv.querySelector('.js-content-text-edit').value
				}).then((data) => {
					console.log('delete complete')
					render(data)
				});
			})
		}

		if (blogItems.length === 0) {
			container.innerHTML = `
			<li class="list-group-item">
			No blogItems!
			</li>
			`;
		}
	} // render


	GET('/api/blog')
		.then((blogItems) => {
			render(blogItems);
		});

	document.querySelector('.js-add-blog').addEventListener('click', (e) => {
		const input = document.querySelector('.js-blog-text');
		const textInput = document.querySelector('.js-blog-body-text');
		input.setAttribute('disabled', 'disabled');

		POST('/api/blog', {
			blog: input.value,
			blogText: textInput.value,
			when: new Date().getTime() + 9 * 60 * 60 * 1000
		}).then((data) => {
			input.removeAttribute('disabled');
			input.value = '';
			textInput.removeAttribute('disabled');
			textInput.value = '';
			render(data);
		});

		
	})



	
})();
