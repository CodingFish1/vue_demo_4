const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';

export default{
    data(){
        return{

        };
    },
    props:['tempProduct','axiosStatus','currpagejs'],

    // watch:{
    //   axiosStatus:function(requesttype){
    //     console.log(requesttype);
    //   }
    // },

    methods:{

      cudRouter(){
        if(this.axiosStatus==='new'){
            axios.post(`${apiUrl}/api/${path}/admin/product`,{data:this.tempProduct})
                .then((res)=>{
                console.log(res);
                this.$emit('fromChild')})
                .catch((error)=>{console.dir(error);})
        }else if(this.axiosStatus==='edit'){
            axios.put(`${apiUrl}/api/${path}/admin/product/${this.tempProduct.id}`,{data:this.tempProduct})
                .then((res)=>{
                console.log(res);
                this.$emit('fromChild',this.currpagejs)
                console.log(this.currpagejs);})
                .catch((error)=>{console.dir(error);})}
              },
      
      addImg(){
        this.tempProduct.imagesUrl.push('');
      },
      
      rmImg(){
        this.tempProduct.imagesUrl.pop();
      },

      },

    mounted(){
      
  },

    template:`<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
 <div class="modal-dialog modal-xl">
   <div class="modal-content border-0">
     <div class="modal-header bg-dark text-white">
       <h5 id="productModalLabel" class="modal-title">
         <slot><span></span></slot>
       </h5>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div class="modal-body">
       <div class="row">
         <div class="col-sm-4">
           <div class="mb-3">
             <label for="imageUrl" class="form-label">主要圖片</label>
             <input type="text" class="form-control mb-2" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
             <img class="img-fluid" v-bind:src="tempProduct.imageUrl">
           </div>
           <h3 class="mb-3">多圖新增</h3>
           <div v-if="Array.isArray(tempProduct.imagesUrl)">
            <div class="mb-2" v-for="(item,key) in tempProduct.imagesUrl" :key="key">
              <div class="mb-3">
                <input type="text" class="form-control mb-2" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                <img class="img-fluid" v-bind:src="tempProduct.imagesUrl[key]" alt="">
              </div>
            </div>
            <div v-if="tempProduct.imagesUrl.length===0 ||tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]">
              <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImg">
                新增圖片
              </button>
            </div>
          </div>
          <div v-else>
            <button class="btn btn-outline-danger btn-sm d-block w-100" @click="rmImg">
              刪除圖片
            </button>
          </div>
         </div>
         <div class="col-sm-8">
           <div class="mb-3">
             <label for="title" class="form-label">標題</label>
             <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
           </div>

           <div class="row">
             <div class="mb-3 col-md-6">
               <label for="category" class="form-label">分類</label>
               <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                 placeholder="請輸入分類">
             </div>
             <div class="mb-3 col-md-6">
               <label for="price" class="form-label">單位</label>
               <input id="unit" v-model="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
             </div>
           </div>

           <div class="row">
             <div class="mb-3 col-md-6">
               <label for="origin_price" class="form-label">原價</label>
               <input id="origin_price" v-model.number="tempProduct.origin_price" type="number" min="0"
                 class="form-control" placeholder="請輸入原價">
             </div>
             <div class="mb-3 col-md-6">
               <label for="price" class="form-label">售價</label>
               <input id="price" v-model.number="tempProduct.price" type="number" min="0" class="form-control"
                 placeholder="請輸入售價">
             </div>
           </div>
           <hr>

           <div class="mb-3">
             <label for="description" class="form-label">產品描述</label>
             <textarea id="description" v-model="tempProduct.description" class="form-control"
               placeholder="請輸入產品描述">
           </textarea>
           </div>
           <div class="mb-3">
             <label for="content" class="form-label">說明內容</label>
             <textarea id="description" v-model="tempProduct.content" class="form-control"
               placeholder="請輸入說明內容">
           </textarea>
           </div>
           <div class="mb-3">
             <div class="form-check">
               <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                 :true-value="1" :false-value="0">
               <label class="form-check-label" for="is_enabled">是否啟用</label>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
         取消
       </button>
       <button type="button" class="btn btn-primary" @click="cudRouter">
         確認
       </button>
     </div>
   </div>
 </div>
</div>`
};