<template>
<div>
  <ul v-for="node in nodes" :key="node.key">
    <li v-if="node.children">
      <span>
        <CaretDownOutlined class="svg" v-if="node.expanded" />
        <CaretRightOutlined class="svg" v-else />
      </span>
      <a-checkbox v-if="node.checked" v-model:checked="node.selected"></a-checkbox>
      <span>{{ node.title }}</span>
      <CommonTree v-if="node.expanded" :nodes-tree="node.children" />
    </li>
    <li v-else>
      <a-checkbox v-model:checked="node.selected">{{ node.title }}</a-checkbox>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import { ref } from "vue";
import { NodeTree } from "@/utils/response";
import {CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons-vue'

export default {
  name: "CommonTree",
  components: {
    CaretDownOutlined,
    CaretRightOutlined,
  },
  props: {
    nodesTree: Array,
  },
  setup(props: any) {
    const nodes = ref<NodeTree[]>(props.nodesTree)
    console.log(nodes)

    return {
      nodes,
    }
  }
};
</script>

<style scoped lang="less">
ul {
  list-style: none;
  padding-left: 0;
  li {
    white-space: nowrap;
    width: 100%;
    .svg {
      margin-left: -10px;
    }
    span {
      margin-left: 10px;
    }
    i {
      font-size: 10px;
      cursor: pointer;
    }
    ul {
      padding-left: 30px;
    }
  }
}
</style>
