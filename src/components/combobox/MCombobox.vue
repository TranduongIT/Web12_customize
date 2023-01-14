<template>
  <div class="m-combobox">
    <input
      autocomplete="off"
      :id="id"
      v-model="textSelected"
      class="m-combobox__input"
      type="text"
      @keydown="inputOnKeyDown"
      @input="onSearchItem"
    />
    <button
      @click="onShowHideData"
      class="combobox__button sprite-down"
    ></button>
    <div v-show="isShowData" class="comboxbox__data">
      <a
        class="cbx-item"
        :ref="`item__${index}`"
        :class="{ 'item--selected': index == indexItemSelect }"
        :value="entity[propValue]"
        v-for="(entity, index) in entitySearch"
        :key="index"
        @click="itemOnSelect(entity, index)"
        >{{ entity[propName] }}</a
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MEnum from "../../js/enum";
export default {
  name: "MCombobox",
  computed: {},
  props: ["id", "api", "propName", "propValue", "modelValue"],
  emits: ["update:modelValue"],
  methods: {
    /**
     * ẩn hiện combobox
     * Created By: TNDuong(9/1/2023)
     */
    onShowHideData() {
      this.isShowData = !this.isShowData;
    },
    /**
     * Tìm kiếm item theo tên
     * Created By: TNDuong(9/1/2023)
     */
    onSearchItem() {
      var me = this;
      //Thực hiện tìm item tường ứng với model value:
      this.entitySearch = this.entities.filter((item) =>
        item[me.propName].toLowerCase().includes(me.textSelected.toLowerCase())
      );
      this.isShowData = true;
    },
    itemOnSelect(entity) {
      var me = this;
      // reset lại danh sách
      this.entitySearch = this.entities;
      this.itemSelected = entity;
      //tính toán lại index của item đã được chọn:
      let findIndex = this.entitySearch.findIndex(
        (item) => item[me.propValue] == entity[me.propValue]
      );
      // set index của item được chọn
      this.indexItemSelect = findIndex;
      this.textSelected = entity[this.propName];
      this.isShowData = false;
      this.$emit("update:modelValue", entity[this.propValue]);
    },
    /**
     * Tìm kiếm item tương ứng với model value
     * Created By: TNDuong(9/1/2023)
     */
    setItemSelected() {
      var me = this;
      //Thực hiện tìm item tương ứng với model value:
      let entitySelected = this.entities.find(
        (item) => item[me.propValue] == me.modelValue
      );
      if (entitySelected) {
        this.textSelected = entitySelected[this.propName];
      }
    },
    /**
     * Tìm kiếm item tương ứng với model value
     * Created By: TNDuong(9/1/2023)
     */
    inputOnKeyDown() {
      const keyCode = event.keyCode;
      switch (keyCode) {
        case MEnum.KEY_CODE.ENTER:
          // xác định item đang chọn dựa vào index
          // eslint-disable-next-line no-case-declarations
          const item = this.entitySearch[this.indexItemSelect];
          this.itemOnSelect(item);
          break;
        case MEnum.KEY_CODE.ROW_DOWN:
          // eslint-disable-next-line no-case-declarations
          let maxlength = this.entitySearch.length;
          if (this.indexItemSelect < maxlength - 1) {
            this.indexItemSelect++;
          }
          break;
        case MEnum.KEY_CODE.ROW_UP:
          if (this.indexItemSelect > 0) {
            this.indexItemSelect--;
          }
          break;
        default:
          break;
      }
    },
  },
  created() {
    if (this.api) {
      axios
        .get(this.api)
        .then((data) => {
          this.entities = data.data;
          this.entitySearch = data.data;
          this.setItemSelected();
        })
        .catch((res) => {
          console.log(res);
        });
    }
  },
  data() {
    return {
      isShowData: false,
      entities: [],
      textSelected: null,
      entitySearch: [],
      indexItemSelect: 0,
      itemSelected: null,
    };
  },
};
</script>

<style scoped>
@import url(combobox.css);
</style>
