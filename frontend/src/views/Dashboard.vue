<template>
  <div class="Dashboard">
    <AppBar />
    <v-main>
      <v-container>
        <v-row class="text-center">
          <v-col class="mb-4">
            <h3 class="mt-10 mb-5 headline">Искать кандидатов</h3>
            <v-form v-model="isFormValid">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.title"
                      label="Название вакансии"
                      :rules="titleRules"
                      required
                      height="42"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="form.selectedSkills"
                      :items="skills"
                      attach
                      chips
                      height="42"
                      label="Ключевые навыки"
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="form.city"
                      :items="cities"
                      height="42"
                      label="Город"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="form.experience"
                      :items="experienceItems"
                      height="42"
                      label="Опыт"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
               <v-btn
                :disabled="!isFormValid"
                color="success"
                class="mr-4"
                @click="search"
              >
                Искать
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      {{candidates}}
      <v-data-table
        v-if="candidates.length"
        :headers="headers"
        :items="candidates"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppBar from '../components/AppBar'

export default {
  name: 'Dashboard',
  components: {
    AppBar
  },
  data() {
    return {
      isFormValid: false,
      titleRules: [
        v => !!v || 'Название вакансии обязательно'
      ],
      form: {
        title: "",
        selectedSkills: "",
        city: "",
        experience: ""
      },
      skills: ['JavaScript', 'Python', 'Java', 'C++', 'C#'],
      cities: ['Москва', 'Санкт-Петербург', 'Сызрань', 'Волгоград'],
      experienceItems: ['меньше года', 'от 1 до 3 лет', 'от 3 до 6 лет', 'больше 6 лет'],
      headers: [
        {
          text: 'Название резюме',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Опыт', value: 'experience' },
        { text: 'Ссылка', value: 'url' },
      ],
      candidates: []
    }
  },
  computed: {
    ...mapState('User', [
      'user'
    ])
  },
  methods: {
    async search(){
      let serchRequest = {
        title: this.form.title,
        experience: this.form.experience
      };
    
      await fetch('http://localhost:3000/search', {
          method: 'POST',
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serchRequest),
      }).then((response) => {
        console.log(response);
        this.getContent("../../../backend/resumes.json", function(text){
          const data = JSON.parse(text);
          this.candidates = data;
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    },
    getContent(file, callback) {
      console.log(file);
      let rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText);
          }
      }
      rawFile.send(null);
    }
  }
}
</script>

<style lang="scss">
//.Dashboard {

//}
</style>
