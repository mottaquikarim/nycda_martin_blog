const express = require('express');

const router = express.Router();

const blogList = require('./blogList')


// body parser middleware
const parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());

//define a route on `/hello/world`
router.get('/blog',(request, response, next) => {
	next();
});



// post blog
router.post('/blog', (request, response, next) => {
	const requestBody = request.body;

	// Add a post
	blogList.createItem(requestBody);

	next();

});



// put blog
router.put('/blog/:id', (request, response, next) => {
	console.log('HERE')
	const id = parseInt(request.params.id, 10);
	const dataPayload = request.body;

	blogList.updateItem(id, 'data.blog', dataPayload.blog);
	blogList.updateItem(id, 'data.blogText', dataPayload.blogText);

	next();
}); // blog
 

// delete blog
router.delete('/blog/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);

	blogList.deleteItem(id);

	next();
}); 

// delete

router.use((request, response) => {
	response.header('Content-Type', 'application/json');
	response.send(blogList.getItems());	
});




module.exports = router;





