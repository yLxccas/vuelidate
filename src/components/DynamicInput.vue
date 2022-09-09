<template>
  <div class="grid">
    <div class="w-full">
      <label class="ml-2"> Telefone </label>
      <div v-for="(course, index) in courses" :key="index">
        <div class="flex justify-start ml-2">
          <InputText
            :class="{ invalid: v$.telephone.$error }"
            v-model="course.courseName"
            @input="v$.telephone.$touch()"
            class="w-full mb-2 py-2 border"
          />
          <small v-if="v$.telephone.$dirty && v$.telephone.required.$invalid" class="errorInputs">
            O campo telefone é obrigatório
          </small>
          <small v-if="v$.telephone.$dirty && v$.telephone.phone_validations.$invalid" class="errorInputs">
            O campo telefone está invalido
          </small>
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

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export function validPhone(telephone: string) {
  let validPhonePattern = new RegExp("(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])");
  if (validPhonePattern.test(telephone)) {
    return true;
  }
  return false;
}

export default {
  name: "DynamicInput",
  props: {
    msg: String,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      courses: [
        {
          courseName: "",
        },
      ],
      telephone: "",
    };
  },
  validations() {
    return {
      telephone: {
        required,
        phone_validations: {
          $validator: validPhone
        }
      }
    }
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

<style>
  .errorInputs {
  color: rgb(255, 0, 0);
}
.invalid {
  border: 2px solid rgb(255, 0, 0);
}
.invalid:not(.disable):hover {
    border: 2px solid rgb(255, 0, 0);
  }
.invalid:enabled:focus {
  box-shadow: none;
  border-color: rgb(255, 0, 0);
}
</style>
