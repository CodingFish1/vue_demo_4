// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from "./components/pagination.js";
import productmodal from "./components/modal.js";
const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';
let productModal="";
let delModal="";

const app=Vue.createApp({
    data(){
        return {

            tempProduct:{
                imagesUrl:[],
            },
            axiosStatus:"",
            modalTitle:"",

            itemToDel:[],
            products: [],
            selectedItem:{},
            itemCounter:"",

            pagination_bg:{}, //pagination data from backend
        }
    },
    components:{pagination,productmodal},

    methods:{
        modalSwitcher(status,item){
            if(status==="new"){
                this.tempProduct={imagesUrl:[]};
                this.axiosStatus='new'
                this.modalTitle="新增商品"
                productModal.show();
        }else if(status==="edit"){
                this.tempProduct=JSON.parse(JSON.stringify(item))
                this.axiosStatus='edit';
                this.modalTitle="編輯商品"
                productModal.show();}},
                
        getProduct(page=1){
            axios.get(`${apiUrl}/api/${path}/admin/products/?page=${page}`)
                .then((res)=>{
                    console.log("Hi");
                    this.products=res.data.products;
                    this.pagination_bg=res.data.pagination;
                    this.itemCounter=Object.values(this.products).length;
                    productModal.hide();
                    console.log("Hi");
                })
                .catch((error)=>{console.dir(error);})},
        
        isDelete(item){
            delModal.show()
            this.itemToDel=JSON.parse(JSON.stringify(item))},

        deleteItem(){
            axios.delete(`${apiUrl}/api/${path}/admin/product/${this.itemToDel.id}`)
                .then((res)=>{this.getProduct();
                    delModal.hide()})
                .catch((error)=>{
                    console.dir(error);})},
        
        loginVeri(){
            const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization']=token;
            axios.post(`${apiUrl}/api/user/check`)
                    .then((res)=>{
                        if(res.data.success){this.getProduct()}})
                    .catch((error)=>{
                        alert('驗證失敗，請重試');
                        window.location = 'index.html';})},
        
        pageClicked(page){
            console.log('page clicked',page);
            this.getProduct(page);
        }
    },

    mounted(){
        productModal=new bootstrap.Modal(document.querySelector('#productModal'));
        delModal=new bootstrap.Modal(document.querySelector('#delProductModal'));
        this.loginVeri();
    }
})

app.mount('#app');