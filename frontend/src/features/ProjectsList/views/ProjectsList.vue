<template>
  <v-container
    fluid
    class="ml-0 pl-0 pt-0 mr-0 pr-0"
    style="
     height: 100%;
    background-image: url('http://bit.ly/3XgO0dX')"
  >
    <v-form class="pl-0 pr-0 mt-0">
      <v-text-field
        v-model="textValue"
        dark
        solo-inverted
        class="  pl-0 mt-0 text-md-h5"
        text
        label="Name"
        :rules="[(v) => v.length > 0 ||'Cannot be empty']"
      />
    </v-form>
    <v-row class="ml-6 mr-6">
      <v-col
        class="px-1"
        cols="12"
        sm="3"
        lg="2"
        md="2"
        xl="1"
      >
        <v-sheet class="rounded ma-0 pa-0">
          <v-card-subtitle class="pa-1 pt-1 d-flex align-center ">
            Todo
            <v-spacer />
            <v-menu

              offset-x
            >
              <template #activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  left
                  dark
                  color="black"
                  v-on="on"
                >
                  mdi-dots-horizontal
                </v-icon>
              </template>

              <v-card width="300">
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-avatar class="ma-0">
                        <img
                          src="https://www.gravatar.com/avatar/62da7cdbf9f4072f8b935b5452c8d5b6?s=80&d=retro&r=g"
                        >
                      </v-avatar>
                    </v-col>
                    <v-col><h3> Owner</h3> 4 days ago</v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn text color="red">
                    <v-icon
                      left
                      dark
                      color="red"
                    >
                      mdi-minus-circle
                    </v-icon> <span style="color: red">
                      DELETE CARD
                    </span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-card-subtitle>
          <v-card-text>
            <v-card class="pa-0 mb-1">
              <v-card-subtitle style="color: black" class="pa-1">
                task1
              </v-card-subtitle>
            </v-card><v-card class="">
              <v-card-subtitle style="color: black" class="pa-1">
                task2
              </v-card-subtitle>
            </v-card>
          </v-card-text>

          <v-card
            v-if="addBoard"
            flat
            class="ma-0 pa-0"
            @click="addBoard=false"
          >
            <v-card-text
              class="a ma-0 pa-0"
            >
              <v-card
                flat
                class="add-card pa-1"
                height="35"
              >
                <v-card-subtitle class="add-card ma-0 pa-1">
                  Add a card...
                </v-card-subtitle>
              </v-card>
            </v-card-text>
          </v-card>
          <v-card
            v-else
          >
            <v-card-text
              v-click-outside="onClickOutside"
              class="size d-flex align-center md-20"
            >
              <v-text-field
                height="20px"
                autofocus
                append-icon="mdi-content-save"
                flat
                color="black"
                hide-details="auto"
                solo
                :rules="[(v) => v.length > 0 ||'Cannot be empty']"
              />
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        lg="2"
        md="2"
        xl="1"
      >
        <v-card
          v-if="addList"
          class=" add-list ma-0 pa-1"
          flat
          @click="addList = false;"
        >
          <v-card-text class="white--text mt-0 pa-0">
            <v-card-subtitle class="text--white add-list ma-0 pa-0">
              Add a list...
            </v-card-subtitle>
          </v-card-text>
        </v-card>
        <v-card
          v-else
          v-click-outside="onClickOutside"
          class="pa-2"
        >
          <v-text-field
            v-model="textName"
            autofocus
            label="Name"
            :rules="[(v) => v.length > 0 ||'Cannot be empty']"
          />
          <v-card-actions>
            <v-btn
              class="ml-0 white--text font-weight-bold"
              :disabled="!textName"
              color="green"
              @click="() => null"
            >
              CREATE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';

export default defineComponent({
  name: 'ProjectList',

  props: {
    msg: String,
  },

  setup(props) {
    // eslint-disable-next-line max-len

    const addList = ref(true);

    const addBoard = ref(true);
    const textBackgroundColor = ref('');
    const textColor = ref('white');
    const textValue = ref('Example');
    const textName = ref();

    const onClickOutside = () => {
      addList.value = true;
      addBoard.value = true;
    };
    const onClickOutsideTexfield = () => {
      textBackgroundColor.value = '';
      textColor.value = 'white';
    };

    const onClickInsideTexField = () => {
      textBackgroundColor.value = 'white';
      textColor.value = 'black';
    };

    return {
      addList,
      addBoard,
      onClickOutside,
      textBackgroundColor,
      onClickOutsideTexfield,
      onClickInsideTexField,
      textColor,
      textValue,
      textName,
    };
  },
});

</script>

<style scoped>

.a{}

.a:hover{
  text-decoration:underline;
  background-color:black;
}

.add-list{
  text-decoration-color: white;
  background-color:#757575;
  opacity: 0.70;
}

.add-list:hover{
 color: white;
  opacity: 1;
}

.add-card{
  background-color: #E0E0E0;
}

.add-card:hover{
  color: black;
  background-color: #BDBDBD;
}

</style>
