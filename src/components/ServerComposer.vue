<template>
  <v-card
    class="ma-5"
    title="Server Composer"
  >
    <v-form ref="form" @change="options = ['No Options']" @submit.prevent="calculateOptions">
      <v-container>
        <v-row>
          <v-select
            v-model="cpu"
            :items="cpuList()"
            label="CPU"
          />
          <v-text-field
            v-model="memorySize"
            label="Memory Size"
            :rules="memorySizeRules"
            suffix="MB"
          />
          <v-checkbox v-model="gpu" label="GPU" />
        </v-row>

        <v-row>
          <v-btn
            block
            type="submit"
          >Submit
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>

  <v-card class="ma-5" title="Server Model Options">
    <v-list :items="options" />
  </v-card>
</template>

<script lang="ts">
  import type { VForm } from 'vuetify/components'
  import { defineComponent } from 'vue'
  import {
    type CPU,
    cpuList,
    getServerModelOptions,
    memorySizeFormatCheck,
    memorySizeMinMaxCheck,
    memorySizePowerOfTwoCheck,
    type ServerModels,
  } from '@/services/serverModelService.ts'

  export default defineComponent({
    name: 'ServerComposer',
    data: () => ({
      options: ['No Options'] as ServerModels[],
      cpu: undefined as CPU | undefined,
      memorySize: undefined,
      gpu: false,
      memorySizeRules: [
        (v: string) => memorySizeMinMaxCheck(v) || 'Memory size must be between 4,096MB (included) and 8,388,608MB (included)',
        (v: string) => memorySizeFormatCheck(v) || 'Memory size must be comma separated integer number (e.g. 4,096)',
        (v: string) => memorySizePowerOfTwoCheck(v) || 'Memory size must be a power of 2',
      ],
    }),
    methods: {
      cpuList () {
        return cpuList
      },
      async calculateOptions () {
        const { valid } = await (this.$refs.form as VForm).validate()
        if (valid && this.cpu && this.memorySize) {
          this.options = getServerModelOptions(this.cpu, this.memorySize, this.gpu)
        }
      },
    },
  })
</script>
