<template>
  <div class="grid w-full p-3 flex justify-content-center">
    <Card class="col-4 pl-4">
      <template #content>
        <div class="grid">
          <div class="col-12 flex justify-content-center">
            <h3 class="text-primary">Validação</h3>
          </div>
        </div>

        <div class="grid">
          <div class="col-6">
            <div class="field flex flex-column">
              <label class="m-0"> Nome </label>
              <InputText
                :class="{ invalid: v$.name.$error }"
                class="w-auto"
                v-model="formData.name"
                @input="v$.name.$touch()"
              />
              <smal v-if="v$.name.$dirty && v$.name.required.$invalid" class="errorInputs">
                o campo nome é obrigatório
              </smal>
            </div>
          </div>

          <div class="col-6">
            <div class="field flex flex-column">
              <label class="m-0">
                Sobrenome
              </label>
              <InputText
                :class="{ invalid: v$.lastName.$error }"
                class="w-auto"
                @input="v$.lastName.$touch()"
                v-model="formData.lastName"
              />
              <smal v-if="v$.lastName.$dirty && v$.lastName.required.$invalid" class="errorInputs">
                o campo sobrenome é obrigatório
              </smal>
            </div>
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <div class="field flex flex-column">
              <label class="m-0"> Email </label>
              <InputText
                :class="{ invalid: v$.email.$error }"
                class="w-auto"
                v-model="formData.email"
                @input="v$.email.$touch()"
              />
              <div v-if="v$.email.$dirty">
                <small class="errorInputs" v-if="v$.email.$dirty && v$.email.required.$invalid">
                  Campo obrigatório
                </small>
                <small class="errorInputs" v-if="v$.email.$dirty && v$.email.email.$invalid">
                  Email invalido
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <div class="field flex flex-column">
              <label class="m-0"> Idade </label>
              <InputText
                :class="{ invalid: v$.age.$error }"
                class="w-auto"
                @input="v$.age.$touch()"
                v-tooltip.bottom.focus="'Digite sua idade entre, entre 0 à 120 anos.'"
                v-model="formData.age"
              />
              <smal v-if="v$.age.$dirty && v$.age.required.$invalid" class="errorInputs">
                o campo Idade é obrigatório
              </smal>
              <smal v-if="v$.age.$dirty && v$.age.minValue.$invalid" class="errorInputs">
                o campo Idade não pode ser menor que 0 caracteres
              </smal>
              <smal v-if="v$.age.$dirty && v$.age.maxValue.$invalid" class="errorInputs">
                o campo Idade não pode ser maior que 120 caracteres
              </smal>
            </div>
          </div>
        </div>

        <div class="grid">
          <div class="col-6">
            <div class="field flex flex-column">
              <label class="m-0"> Cpf </label>
              <InputText
                :class="{ invalid: v$.cpf.$error }"
                v-model="formData.cpf"
                @input="v$.cpf.$touch()"
                @blur="formCpf($event.target)"
                class="w-auto"
              />
              <smal v-if="v$.cpf.$dirty && v$.cpf.required.$invalid" class="errorInputs">
                o campo cpf é obrigatório
              </smal>
            </div>
          </div>

          <div class="col-6">
            <div class="field flex flex-column">
              <label class="m-0"> Cep </label>
              <InputText
                :class="{ invalid: v$.cep.$error }"
                v-model="formData.cep"
                @input="v$.cep.$touch()"
                class="w-auto"
              />
              <smal v-if="v$.cep.$dirty && v$.cep.required.$invalid" class="errorInputs">
                o campo cep é obrigatório
              </smal>
            </div>
          </div>
        </div>
        <DynamicInput/>
        <div class="grid">
          <div class="col-12 mt-2">
            <div class="field flex justify-content-end">
              <Button class="w-full" label="Enviar" />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minValue, maxValue } from "@vuelidate/validators";
import DynamicInput from './components/DynamicInput.vue'

const formData = reactive({
  name: "",
  lastName: "",
  email: "",
  age: "",
  cpf: "",
  cep: "",
});

const rules = {
  name: { required },
  lastName: { required },
  email: { required, email },
  age: { required, minValue: minValue(0), maxValue: maxValue(120) },
  cpf: { required },
  cep: { required },
};

const v$ = useVuelidate(rules, formData);
const cpfReg = /^(\d{3})(\d{3})(\d{3})(\d{2})/

function formCpf (cpf: string) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function formCep (cep: string) {
  return cep.replace(/^(\d{5})(\d{2})/, '$1-$2')
}
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
.card {
  border: 2px solid #000;
  padding: 10px 5px;
}
.title {
  display: flex;
  justify-content: center;
  font-weight: bold;
  text-decoration: underline;
}
</style>
