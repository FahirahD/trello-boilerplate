<template>
  <v-container v-if="!createListMode" class="pa-0 ma-0">
    <v-sheet class="rounded ma-0 pa-0">
      <v-card-subtitle class="pa-1 pt-1 d-flex align-center ">
        {{ column.name }}
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
              <v-btn
                text
                color="red"
                @click="deleteCol(column)"
              >
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
      <draggable
        :list="tasks"
        group="`tasks${column._id}`"
        :data-zone="column._id"
        @end="(e) => checkMove(e)"
      >
        <v-card-text
          v-for="task in tasks"
          :id="task._id"
          :key="task._id"
          class="pt-1 pb-1"
        >
          <Task :task="task" />
        </v-card-text>
      </draggable>
      <Task
        :task="newTask"
        :add-mode="true"
        :column-i-d="column._id"
        @addNewTask="addNewTask"
      />
    </v-sheet>
  </v-container>
  <v-container v-else class="pa-0 ma-0">
    <v-card
      v-if="addList"
      class=" add-list ma-0 pa-1"
      flat
      @click="$emit('prepareCol');addList = false;"
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
        v-model="column.name"
        autofocus
        label="Name"
        :rules="[(v) => !!v ||'Cannot be empty']"
      />
      <v-card-actions>
        <v-btn
          class="ml-0 white--text font-weight-bold"
          :disabled="!column.name"
          color="green"
          @click="saveCol(column)"
        >
          CREATE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import draggable from 'vuedraggable';
import { useFind } from 'feathers-vuex';
import Task from '@/features/ProjectsList/components/Task.vue';
import store from '@/store';

export default defineComponent({
  name: 'Column',

  components: {
    Task,
    draggable,
  },

  props: {
    column: Object,
    createListMode: Boolean,
    boardID: String
  },

  setup(props, context) {
    const { Task } = context.root.$FeathersVuex.api;
    const tasksParams = computed(() => ({
      // eslint-disable-next-line no-underscore-dangle
      query: { columnId: props.column._id }
    }));
    const tasksParams2 = computed(() => ({
      // eslint-disable-next-line no-underscore-dangle
      query: { }
    }));

    // 3. Provide the model and params in the options
    const { items: tasks, isPending: isTasksLoading } = useFind({ model: Task, params: tasksParams });
    const addList = ref(true);

    const checkMove = (v) => {
      const { items: tasks, isPending: isTasksLoading } = useFind({ model: Task, params: tasksParams2 });

      // eslint-disable-next-line no-underscore-dangle
      const task = ref(tasks.value.find((x) => x._id === v.item.id));

      task.value.columnId = v.to.dataset.zone;
      task.value.save();
    };

    const addBoard = ref(true);
    const newTask = ref();

    const onClickOutside = () => {
      addList.value = true;
      addBoard.value = true;
    };

    const addNewTask = () => {
      console.log('added new task');
      newTask.value = new Task();
    };

    const saveCol = (col) => {
      // eslint-disable-next-line no-param-reassign
      col.boardId = props.boardID;
      col.create();
      addList.value = true;
    };

    const deleteCol = (col) => {
      // const tasksToRemove : Array<any> = tasks.value.filter((t) => t.columnId === col.id);
      // tasksToRemove.forEach((t) => t.remove());
      col.remove();
    };

    return {
      onClickOutside,
      addList,
      addBoard,
      tasks,
      newTask,
      addNewTask,
      saveCol,
      deleteCol,
      checkMove
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
