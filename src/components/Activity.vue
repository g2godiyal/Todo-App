<template>
  <div class="main">
    <h1>TODO APP</h1><br><br>
	<div class="container text-left">
	<div class="row">
	<div class="col-md-6 offset-md-3">
	<form @submit.prevent="addActivityMethod">
    <div class="form-group">
      <label for="activity">Activity:</label>
      <input type="text" class="form-control" v-model="activity" 
            placeholder="Please enter the activity" v-validate="'required'" id="activity" name="activity" :class="{ 'is-invalid': submitted && errors.has('activity') }">
			<div v-if="submitted && errors.has('activity')" class="invalid-feedback">
                  {{ errors.first("activity") }}
                </div>
    </div>
    <div class="form-group">
      <label for="date">Date:</label>
      <input type="date" class="form-control"  v-model="date" v-validate="'required'" id="date" name="date" :class="{ 'is-invalid': submitted && errors.has('date') }">
	  <div v-if="submitted && errors.has('date')" class="invalid-feedback">
                  {{ errors.first("date") }}
                </div>
    </div>
    <button type="submit" class="btn btn--primary">Submit</button>
  </form>
  <br><br><br><br>
	</div>
	
	</div>
	</div>
	
	
    <div v-if="isEmpty">
      <h5>There are no activities at this moment !</h5>
	  <br><br>
      </div>
	  
      <div v-else>
	  <table style="width:100%;" class='k-table' cellspacing='0' cellpadding='0'>
    <colgroup>
    </colgroup>
    <thead class="thead">
        <tr class="thead__tr">
            <th colspan="1" rowspan="1" class="thead__td">Activity</th>
			<th colspan="1" rowspan="1" class="thead__td">Date</th>
			<th colspan="1" rowspan="1" class="thead__td">Remove </th>
			<th colspan="1" rowspan="1" class="thead__td">Mark Complete</th>
        </tr>
    </thead> 
    <tbody class="tbody">
        <tr v-for="item in activities" class="tbody__tr">
            <td class="tbody__td" :key="item.name" >{{item.name}}</td>
			<td class="tbody__td" :key="item.date" >{{getDate(item.date)}}</td>
			<td class="tbody__td"><a @click="removeActivity(item)"><button class="btn btn-danger"><i class="fa fa-trash"></i></button></a></td>
			<td class="tbody__td"><a @click="completeActivity(item)"><button class="btn btn-success"><i class="fa fa-check"></i></button></a></td>
            
        </tr>
    </tbody>
    
</table>

<div class="container-fluid">
	<div class="row">
	<div class="col-md-6 row__complete">
	<strong>Completed :</strong> {{completed}}
	</div>
	<div class="col-md-6 row__total">
	<strong>Total :</strong> {{total}}
	</div>
	
	</div>
	</div>		
		
</div>
    
    

    
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import moment from 'moment'
  import uuid from 'uuid/v4'
  export default {
    name: 'Activity',
    data() {
      return {
        activity: '',
        wrong: false,
        date: '',
        errorMessage: '',
		submitted: false
      }
    },
    computed: {
      ...mapGetters({
        'activities': 'getActivities'
      }),
      
      completed() {
        return this.activities.filter((val) => val.completed === true).length;
      },
      total() {
        return this.activities.length;
      },
      isEmpty() {
        return this.activities.length === 0;
      }
    },
    methods: {
      ...mapActions(['addActivity', 'deleteActivity', 'changeActivityState']),
	  
      addActivityMethod(e) {
	  this.submitted = true;
            this.$validator.validate().then(valid => {
                
            });
	  
        if (this.validateData() === true) {
          const activity = {
            name: this.activity,
            completed: false,
            date: this.date,
            id: uuid()
          };

          this.addActivity({activity});
          this.activity = '';
          this.date = '';
          this.wrong = false;
        } else {
          this.wrong = true;
          this.setMessageError();
        }
      },

      removeActivity(item) {
        this.deleteActivity({activity: item})
      },

      completeActivity(item) {
        this.changeActivityState({activity: item})
      },
      
      validateData() {
        if (this.activity !== '' && this.date !== '') {
          return true;
        } else {
          return false;
        }
      },

      
      getDate (item) {
        return moment(item).format('DD/MM/YYYY')
      }
    }
  }
</script>

<style lang="scss">
.main {
	text-align: center;
	max-width: 800px;
	width: 100%;
	margin: 0 auto;
	border: 2px solid #DCDFE6;
	font: 400 13.3333px Arial;
}
.btn {
	&:focus {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
	&:active {
		outline: 0;
		border: 0;
		box-shadow: none;
	}
}
.btn--primary {
	color: #fff;
	background-color: #007bff;
	border-color: #007bff;
	width: 100%;
	&:hover {
		color: #fff;
		background-color: #007bff;
		border-color: #007bff;
		width: 100%;
	}
}
.thead__td {
	padding: 12px 0;
	border-bottom: 1px solid #ccc;
}
td.tbody__td {
	padding: 12px 0;
	border-bottom: 1px solid #ccc;
	background: #d6ecdb;
}
.row__complete {
	padding: 20px 0;
}
.row__total {
	padding: 20px 0;
}
.form-group label {
    font-weight: 600;
}

</style>
