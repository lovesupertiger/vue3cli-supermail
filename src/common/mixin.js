import BackTop from "components/content/backTop/BackTop";

export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return {
      backShow: false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    showListener(position){
      this.backShow = position.y < -1000
    }
  }
}
