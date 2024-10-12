var siteNameInput = document.getElementById('siteName');
var siteURLInput = document.getElementById('siteURL'); 

var bookmarkContainer = [];
if(localStorage.getItem('bookmarks') !== null){ 
    bookmarkContainer = JSON.parse(localStorage.getItem('bookmarks'));
}
displayBookmarks();

function addBookmark() {
    var siteName = siteNameInput.value.trim();
    var siteURL = siteURLInput.value.trim();
    if (!validateSiteName(siteName) || (!validateURL(siteURL))) {
        showErrorMessage(); 
        return;
    }
    var bookmark = {
        name: siteName,
        url: siteURL 
    }
    bookmarkContainer.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkContainer));
    clear()
    displayBookmarks();
}

function validateSiteName(name) {
    return name.length >= 3;
}

function validateURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,})' +
        '(\\:\\d+)?' +
        '(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(url);
}

function showErrorMessage() { 
    errorBox.classList.remove('d-none');
}

function hideErrorMessage() { 
    errorBox.classList.add('d-none');
}

function clear() {
    siteNameInput.value = '';
    siteURLInput.value = '';
}

function displayBookmarks() {
    var container = '';
    for (var i = 0; i < bookmarkContainer.length; i++) {
        container += `
            <tr>
                <td>${i}</td>
                <td>${bookmarkContainer[i].name}</td>
                <td>
                    <button class="border-0 btn btn-visit ">
                        <a  class="text-decoration-none text-white" href="${bookmarkContainer[i].url}" target="_blank">
                            <i class="fas fa-eye"></i> Visit
                        </a>
                    </button>
                </td>
                <td><button class="text-white btn btn-danger" onclick="deleteBookmark(${i})"><i class="fas fa-trash-alt"></i> Delete</button></td>
                </tr>
        `;
    }
    document.getElementById('bodyId').innerHTML =container;
}

function deleteBookmark(item) {
    bookmarkContainer.splice(item, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkContainer));
    displayBookmarks();
}