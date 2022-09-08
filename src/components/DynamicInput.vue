<template>
  <div class="grid">
    <div class="w-full">
      <label class="ml-2"> Telefone </label>
      <div v-for="(course, index) in courses" :key="index">
        <div class="flex justify-start ml-2">
          <InputText
            v-model="course.courseName"
            class="w-full mb-2 py-2 border"
          />
          <Button
            type="button"
            class="ml-2 rounded-md border px-3 py-1 mb-2 bg-red-600 text-white flex justify-content-center"
            @click="remove(index)"
            v-if="index != 0"
          >
            Remover
          </Button>
          
        </div>
        
      </div>
      <Button
        type="button"
        class="flex justify-start mt-2 ml-2 rounded-md border px-3 py-2 "
        @click="addMore()"
      >
        +
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicInput",
  props: {
    msg: String,
  },
  data() {
    return {
      courses: [
        {
          courseName: "",
        },
      ],
    };
  },
  methods: {
    addMore() {
      this.courses.push({
        courseName: "",
      });
    },
    remove(index) {
      this.courses.splice(index, 1);
    },
  },
};
</script>
