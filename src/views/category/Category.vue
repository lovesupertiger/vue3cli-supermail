<template>
  <div class="category" ref="category">
    <ul class="content">
      <li>离别1</li>
      <li>离别2</li>
      <li>离别3</li>
      <li>离别4</li>
      <li>离别5</li>
      <li>离别6</li>
      <li>离别7</li>
      <li>离别8</li>
      <li>离别9</li>
      <li>离别10</li>
      <li>离别11</li>
      <li>离别12</li>
      <li>离别13</li>
      <li>离别14</li>
      <li>离别15</li>
      <li>离别16</li>
      <li>离别17</li>
      <li>离别18</li>
      <li>离别19</li>
      <li>离别20</li>
      <li>离别21</li>
      <li>离别22</li>
      <li>离别23</li>
      <li>离别24</li>
      <li>离别25</li>
      <li>离别26</li>
      <li>离别27</li>
      <li>离别28</li>
      <li>离别29</li>
      <li>离别30</li>
      <li>离别31</li>
      <li>离别32</li>
      <li>离别33</li>
      <li>离别34</li>
      <li>离别35</li>
      <li>离别36</li>
      <li>离别37</li>
      <li>离别38</li>
      <li>离别39</li>
      <li>离别40</li>
      <li>离别41</li>
      <li>离别42</li>
      <li>离别43</li>
      <li>离别44</li>
      <li>离别45</li>
      <li>离别46</li>
      <li>离别47</li>
      <li>离别48</li>
      <li>离别49</li>
      <li>离别50</li>
      <li>离别51</li>
      <li>离别52</li>
      <li>离别53</li>
      <li>离别54</li>
      <li>离别55</li>
      <li>离别56</li>
      <li>离别57</li>
      <li>离别58</li>
      <li>离别59</li>
      <li>离别60</li>
      <li>离别61</li>
      <li>离别62</li>
      <li>离别63</li>
      <li>离别64</li>
      <li>离别65</li>
      <li>离别66</li>
      <li>离别67</li>
      <li>离别68</li>
      <li>离别69</li>
      <li>离别70</li>
      <li>离别71</li>
      <li>离别72</li>
      <li>离别73</li>
      <li>离别74</li>
      <li>离别75</li>
      <li>离别76</li>
      <li>离别77</li>
      <li>离别78</li>
      <li>离别79</li>
      <li>离别80</li>
      <li>离别81</li>
      <li>离别82</li>
      <li>离别83</li>
      <li>离别84</li>
      <li>离别85</li>
      <li>离别86</li>
      <li>离别87</li>
      <li>离别88</li>
      <li>离别89</li>
      <li>离别90</li>
      <li>离别91</li>
      <li>离别92</li>
      <li>离别93</li>
      <li>离别94</li>
      <li>离别95</li>
      <li>离别96</li>
      <li>离别97</li>
      <li>离别98</li>
      <li>离别99</li>
      <li>离别100</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        bscroll: null
      }
    },
    created() {
      //组件创建完成后，并没有挂载
    },
    mounted() {
      this.bscroll = new BScroll(document.querySelector('.category'), {
        probeType: 3,
        pullUpLoad:true
      })
      this.bscroll.on('pullingUp',()=>{
        console.log("加载....")
        this.bscroll.finishPullUp()
      })
    }
  }
</script>

<style scoped>
  .category {
    height: 150px;
    overflow: hidden;
  }
</style>
