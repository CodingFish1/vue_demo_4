export default{
    data(){
        return{
            current_page:"",
        };
    },
    props:[`paginationjs`,`currpagejs`],
    methods:{
      pageTrans(page){
        this.current_page=page;
        this.$emit('curr-page',this.current_page)
      }

    },
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item " :class="paginationjs.has_pre ? 'enabled':'disabled'">
        <a class="page-link" href="" aria-label="Previous" @click.prevent="pageTrans(currpagejs-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in paginationjs.total_pages" :key="page" :class="{active:page===paginationjs.current_page}">
      <a class="page-link" href="" @click.prevent="pageTrans(page)">{{page}}</a></li>
      <li class="page-item" v-bind:class="paginationjs.has_next ? 'enabled':'disabled'">
        <a class="page-link" href="" aria-label="Next" @click.prevent="pageTrans(currpagejs+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
};