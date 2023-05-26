Đọc trang homepage: 
địa chỉ lấy book : http://localhost:5000/books?_page=${pageNum}&_limit=${limit}&q=${query}
limit là mot hang so gioi hạn số book được lấy. 
pageNum số trang 1-10
lấy một 10 book trang đầu tiên: 
 http://localhost:5000/books?_page=1&_limit=10
 khoi tao redux store, slice 
khởi tạo ban đầu lấy được 10 book trang 1 
render ra man hinh 10 book
khoi tao cac state: pageNum, query. 
truyen vao bookSlice de su ly url lay cac book va render
+ detail page
url lay data detail page: http://localhost:5000/books/${bookId} // bookId la Id cua book 
add book( khi click add book thi list favorites sẽ push them data của detail book đó)
add book len sever
sytax add 
const res = await api.post(`/favorites`, book);
thành công thì  state.favorites.push(action.payload); push data book vào list favorite
+ Trang Reading page: 
-Địa chỉ lấy : http://localhost:5000/favorites
- get data favorites
- khi remove book phải chạy lại để lấy data favorites rồi render lại. 
symtax delete book trên sever
const res =  await api.delete(`/favorites/${bookId}`);
gọi function removebook chỉ xoá data của book trên sever. 
- khi removed tren sever thì cần gọi lại get favorites để lấy data render lại. 





+ khi thay đổi các state thì code chạy lại: 
useEffect sẽ được chạy khi các state đã chạy và UI đã render 



