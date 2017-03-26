
// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

// default
db.defaults({ blog: [] }).write();

const blogList = {};


/*
	@func getItems
	@desc gets all blog
*/
blogList.getItems = () => {
	return db.get('blog').value();	
	
}

/*
	@func createItem
	@desc creates a new blog
*/

blogList.createItem = (itemToCreate) => {
	db.get('blog').push({
		id: Date.now(), 
		data: itemToCreate,
	}).write();
		
}



/*

*/	
blogList.updateItem = (id, key, propertyToUpdate) => {
	db.get('blog')
		  .find({ id })
		  .set(key, propertyToUpdate)
		  .write()	
}



blogList.deleteItem = (id) => {
	db.get('blog')
		.remove({id})
		.write();	
}



module.exports = blogList;












