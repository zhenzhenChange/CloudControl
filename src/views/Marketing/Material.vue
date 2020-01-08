<template>
  <Tabs class="Material">
    <TabPane label="文字" icon="md-text">
      <MaterialTabsContent
        :InputInfo="['文字内容']"
        :SelectInfo="SelectOptions"
        :TableColumnsTitle="'文字内容'"
        :ButtonName="'文字'"
      />
    </TabPane>
    <TabPane label="图片" icon="md-images">
      <MaterialTabsContent
        :InputInfo="['图片名称']"
        :SelectInfo="SelectOptions"
        :TableColumnsTitle="'图片文件'"
        :ButtonName="'图片'"
      />
    </TabPane>
    <TabPane label="链接" icon="md-link">
      <MaterialTabsContent
        :InputInfo="['素材名称']"
        :SelectInfo="SelectOptions"
        :TableColumnsTitle="'素材文件'"
        :ButtonName="'链接'"
      />
    </TabPane>
    <TabPane label="语音" icon="md-mic">
      <MaterialTabsContent
        :InputInfo="['文件名称']"
        :SelectInfo="SelectOptions"
        :TableColumnsTitle="'语音文件'"
        :ButtonName="'语音'"
      />
    </TabPane>
    <TabPane label="视频" icon="md-videocam">
      <MaterialTabsContent
        :InputInfo="['视频名称']"
        :SelectInfo="SelectOptions"
        :TableColumnsTitle="'视频文件'"
        :ButtonName="'视频'"
      />
    </TabPane>
    <TabPane label="头像" icon="md-person">
      <MaterialTabsContent
        :InputInfo="['头像名称']"
        :SelectInfo="SelectOptions"
        :TableColumnsTitle="'头像文件'"
        :ButtonName="'头像'"
      />
    </TabPane>
    <TabPane label="名片" icon="md-card">
      <MaterialTabsContent
        :InputInfo="['名片内容']"
        :SelectInfo="SelectOptions"
        :TableColumnsTitle="'名片内容'"
        :ButtonName="'名片'"
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
