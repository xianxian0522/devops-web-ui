<template>
<div>
  <ul v-for="node in nodes" :key="node.key">
    <li v-if="node.children">
      <span>
        <CaretDownOutlined @click="isExpandedChildren(node)" class="svg" v-if="node.expanded" />
        <CaretRightOutlined @click="isExpandedChildren(node)" class="svg" v-else />
      </span>
      <a-checkbox v-if="node.checked" v-model:checked="node.selected"></a-checkbox>
      <span>{{ node.title }}</span>
      <CommonTree v-if="node.expanded" @rsInstanceSelect="instanceSelect($event)" :nodes-tree="node.children" :is-bind="isBind" :cluster-id="clusterId"/>
    </li>
    <li v-else>
      <a-checkbox @click="clusterBindLogicIdcEnv(node.selected, node.id)" v-model:checked="node.selected">{{ node.title }}</a-checkbox>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import { ref } from "vue";
import { NodeTree } from "@/utils/response";
import {CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
import devopsRepository from "@/api/devopsRepository";
import { message } from "ant-design-vue";

export default {
  name: "CommonTree",
  components: {
    CaretDownOutlined,
    CaretRightOutlined,
  },
  props: {
    nodesTree: Array,
    isBind: Boolean,
    clusterId: Number,
  },
  emits: ['rsInstanceSelect'],
  setup(props: any, content: any) {
    const nodes = ref<NodeTree[]>(props.nodesTree)

    const isExpandedChildren = (node: NodeTree) => {
      node.expanded = !node.expanded
    }
    const clusterBindLogicIdcEnv = async (selected: boolean, id: number ) => {
      if (props.isBind) {
        // console.log(selected, '相反???')
        selected ? await devopsRepository.clusterDeleteLogicIdcEnv(props.clusterId, id)
          : await devopsRepository.clusterBindLogicIdcEnv(props.clusterId, id)
        message.success( selected ? '集群成功解除绑定到逻辑机房' : '集群成功绑定逻辑机房')
      } else {
        instanceSelect(id)
      }
    }
    const instanceSelect = (id: number) => {
      content.emit('rsInstanceSelect', id)
    }

    return {
      nodes,
      clusterBindLogicIdcEnv,
      isExpandedChildren,
      instanceSelect,
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
