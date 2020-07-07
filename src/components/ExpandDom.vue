<script>
export default {
  name: "ExpandDom",
  components: {},
  props: {
    // 是否需要添加默认值
    column: {
      type: Object,
      default: () => {
        return {};
      }
    },
    row: {
      type: Object,
      default: () => {
        return {};
      }
    },
    render: {
      type: Function,
      default: () => {
        return;
      }
    },
    index: {
      type: [String, Number],
      default: 1
    }
  },
  methods: {},
  render(h) {
    return this.render(h, this.row);
  }
};
</script>
