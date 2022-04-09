const recombee = require('recombee-api-client');
const { DeleteItem } = require('recombee-api-client/lib/requests');
var rqs = recombee.requests;


const recombeeClient = new recombee.ApiClient('triple-h-dev', 'uJQKfE8uJpBAoSGr9lJDctCRM0bhGl34PuhmEbUBXBlfEeNZkTHv2CDYXTwt7WZE');

function rating(userId, itemId, rating) {
    var i = new rqs.AddRating(userId, itemId, rating, { 'cascadeCreate': true });
    i.timeout = 10000
    recombeeClient.send(i)
}


function cartAdd(userId, itemId) {
    var i = new rqs.AddCartAddition(userId, itemId, { 'cascadeCreate': true })
    i.timeout = 10000
    recombeeClient.send(i)
}

function cartRemove(userId, itemId) {
    var i = new rqs.DeleteCartAddition(userId, itemId, { 'cascadeCreate': true })
    i.timeout = 10000
    recombeeClient.send(i)
}

function viewDetail(userId, itemId) {
    recombeeClient.send(new rqs.AddDetailView(userId, itemId, { 'cascadeCreate': true }))
}

function purchasesItem(userId, itemId) {
    var i = new rqs.AddPurchase(userId, itemId, { 'cascadeCreate': true })
    i.timeout = 10000;
    recombeeClient.send(i)
}

function removePurchases(userId, itemId) {
    var i = new rqs.DeletePurchase(userId, itemId, { 'cascadeCreate': true })
    i.timeout = 10000
    recombeeClient.send(i)
}

function bookmark(userId, itemId) {
    var i = new rqs.AddBookmark(userId, itemId, { 'cascadeCreate': true })
    i.timeout = 10000;
    recombeeClient.send(i)
}

function unBookmark(userId, itemId) {
    var i = new rqs.DeleteBookmark(userId, itemId, { 'cascadeCreate': true });
    i.timeout = 10000;
    recombeeClient.send(i)
}

function getRecomment(userId, count, type) {
    var i = new rqs.RecommendItemsToUser(userId, count, {
        'filter': `'type' == '${type}'`
    })
    i.timeout = 10000;
    recombeeClient.send(i)
}


function createItem(id, type, categories, description) {
    var item = [];
    // item.push(new rqs.AddItem(id));
    item.push(new rqs.AddItemProperty('type', type));
    if (categories) item.push(new rqs.AddItemProperty('categories', new Set(categories)));
    if (description) item.push(new rqs.AddItemProperty('description', description))
    recombeeClient.send(new rqs.Batch(item)).then(res => {
        console.log(`Create ${type} ${id} successful`)
    }).catch(err => {
        console.log(`Create ${type} ${id} fail`)
    })
}

function deleteItem(id) {
    recombeeClient.send(DeleteItem(id))
}

function createUser(id, pref) {
    var item = []
    item.push(new rqs.AddUser(id));
    if (pref) item.push(new rqs.AddUserProperty('pref', new Set(pref)))
    recombeeClient.send(new rqs.Batch(item)).then(res => {
        console.log(`Create ${id} successful`)
    }).catch(err => {
        console.log(`Create ${id} fail`)
    })
}

function likeItem(userId, itemId) {
    cartAdd(userId, itemId)
}

function unLikeItem(userId, itemId) {
    cartRemove(userId, itemId)
}

function commentItem(userId, itemId) {
    cartAdd(userId, itemId)
}

function shareItem(userId, itemId) {
    bookmark(userId, itemId)
}

function viewDetailItem(userId, itemId) {
    viewDetail(userId, itemId)
}

function joinItem(userId, itemId) {
    purchasesItem(userId, itemId)
}

function unJoinItem(userId, itemId) {
    removePurchases(userId, itemId)
}

function visitLocation(userId, itemId) {
    purchasesItem(userId, itemId)
}

function useService(userId, itemId) {
    purchasesItem(userId, itemId)
}

function saveItem(userId, itemId) {
    bookmark(userId, itemId)
}

function unSaveItem(userId, itemId) {
    unBookmark(userId, itemId)
}

function reviewItem(userId, itemId, rate) {
    rating(userId, itemId, rate)
}

function getPostRecomment(userId, count = 10) {
    getRecomment(userId, count, 'post')
}

function getTourRecomment(userId, count = 10) {
    getRecomment(userId, count, 'tour')
}

function getLocationRecomment(userId, count = 10) {
    getRecomment(userId, count, 'location')
}

function getVolunteerRecomment(userId, count = 10) {
    getRecomment(userId, count, 'volunteer')
}

function getServiceRecomment(userId, count = 10) {
    getRecomment(userId, count, 'service')
}

module.exports = {
    createItem,
    deleteItem,
    createUser,
    likeItem,
    unLikeItem,
    commentItem,
    shareItem,
    viewDetailItem,
    joinItem,
    unJoinItem,
    visitLocation,
    useService,
    saveItem,
    unSaveItem,
    reviewItem,
    getPostRecomment,
    getTourRecomment,
    getLocationRecomment,
    getVolunteerRecomment,
    getServiceRecomment
};