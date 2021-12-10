const model = {
    currentBook: null,
    books: [
        {
            clickCount: 0,
            name: 'Đắc nhân tâm',
            imgSrc: 'img/Dac-Nhan-Tam.jpg',
        },
        {
            clickCount: 0,
            name: 'Quảng đi gánh lặng vui sống',
            imgSrc: 'img/quang-ganh-lo-di-va-vui-song.jpg',
        },
        {
            clickCount: 0,
            name: 'Đọc vị bất kì ai',
            imgSrc: 'img/doc-vi-bat-ki-ai.jpg',
        },
        {
            clickCount: 0,
            name: 'Đừng lựa chọn an nhàn khi còn trẻ',
            imgSrc: 'img/dung-lua-chon-an-nhan-khi-con-tre-.jpg',
        },
        {
            clickCount: 0,
            name: 'Người bán hàng vĩ đại nhất thế giới',
            imgSrc: 'img/Sach-nguoi-ban-hang-vi-dai-nhat-the-gioi.jpg',
        },
    ],
};
const controller = {
    init(){
        model.currentBook = model.books[0];

        bookListView.init();
        bookView.init();
        this.action();
    },
    action(){
        var list = $('.list-group-item');

        for (const item of list) {
            item.addEventListener('çlick',function (){
                console.log('ok')
                list.removeClass('active');
                item.addClass('active');
            })

        }
    },
    getCurrentBook(){
        return model.currentBook;
    },
    getBooks(){
        return model.books;
    },

    //đặt sách hiện tại thành đối tượng đưa vào
    setCurrentBook(book){
        model.currentBook = book;
    },
    // tăng bộ đếm cho sách đang chọn
    incrementCounter(){
        model.currentBook.clickCount ++;
        bookView.render();
    },
};
const bookView = {
    init(){
        this.bookElem = document.getElementById('book');
        this.bookNameElem = document.getElementById('book-name');
        this.bookImageElem = document.getElementById('book-img');
        this.countElem = document.getElementById('book-count');

        this.bookImageElem.addEventListener('click',this.clickHandler);

        this.render();
    },
    clickHandler(){
        return controller.incrementCounter();
    },
    render() {
        // cập nhật các phần tử DOM với các giá trị từ sách hiện tại
        const currentBook = controller.getCurrentBook();
        this.countElem.textContent = currentBook.clickCount;
        this.bookNameElem.textContent = currentBook.name;
        this.bookImageElem.src = currentBook.imgSrc;
        this.bookImageElem.style.cursor = 'pointer';
    },
};
const bookListView = {
    init(){
        this.bookListElem = document.getElementById('book-list');

        // hiển thị chế độ xem và cập nhập phần tử
        this.render();
    },
    render() {
        let book;
        let elem;
        let i;

        // lấy danh sách trong bộ điều khiển
        const books = controller.getBooks();

        // làm trông danh sách
        this.bookListElem.innerHTML = '';

        for (let i = 0; i < books.length; i++){
            // đây là sách mà hiện đang lặp lại
            book = books[i];

            //tạo một mục danh sách sách mới và đặt văn bản của nó
            elem = document.createElement('li');
             elem.className = 'list-group-item'
            elem.style.cursor = 'pointer';
            elem.textContent = book.name;
            elem.addEventListener('click',(function (bookCopy){
                return function (){
                    // elem.className = 'active';
                    controller.setCurrentBook(bookCopy);
                    bookView.render();
                };
            })(book)
            );
            // thêm phan tử danh sách
            this.bookListElem.appendChild(elem);

            // var startItem = document.getElementsByTagName('ul')[0];
            // var firstItem = startItem.firstChild;
            // firstItem.className = 'active';
        }
    },
};

controller.init();
