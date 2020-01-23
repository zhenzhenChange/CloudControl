<template>
  <Tabs class="Material">
    <TabPane label="朋友圈素材" icon="md-paper">
      <MaterialTabsContent
        :InputInfo="['素材内容']"
        :TableColumnsTitle="'素材内容'"
      />
    </TabPane>
    <TabPane label="快捷消息模板" icon="md-images">
      <MaterialTabsContent
        :InputInfo="['消息模板']"
        :TableColumnsTitle="'消息模板'"
      />
    </TabPane>
    <TabPane label="个人信息模板" icon="md-link">
      <MaterialTabsContent
        :InputInfo="['个人信息']"
        :TableColumnsTitle="'个人信息'"
      />
    </TabPane>
    <TabPane label="验证信息模板" icon="md-mic">
      <MaterialTabsContent
        :InputInfo="['验证信息']"
        :TableColumnsTitle="'验证信息'"
      />
    </TabPane>
  </Tabs>
</template>

<script>
export default {
  data() {
    return {
      SelectOptions: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ]
    }
  }
}
</script>
