export default{
    data(){
        return{
            current_page:"",
        };
    },
    props:[`pagination`],
    methods:{
      pageTrans(page){
        this.current_page=page;
        console.log("clicked");
        this.$emit('curr-page',this.current_page)
      }

    },
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item " :class="pagination.has_pre ? 'enabled':'disabled'">
        <a class="page-link" href="" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{active:page===pagination.current_page}">
      <a class="page-link" href="" @click.preventDefault="pageTrans(page)">{{page}}</a></li>
      <li class="page-item" v-bind:class="pagination.has_next ? 'enabled':'disabled'">
        <a class="page-link" href="" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
};