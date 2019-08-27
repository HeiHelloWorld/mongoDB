//引入mongoose
const mongoose = require('mongoose')

const md5 = require('blueimp-md5')
//连接数据库,并监视是否连接成功
const url = 'mongodb://localhost:27017/test2'
mongoose.connect(url, { useNewUrlParser: true} )
  .then(()=>{
    console.log('连接数据库成功')
  })
  .catch(error => {
    console.log('连接数据库失败',error)
  })

 // test: 创建定义文档结构的schema对象
 /* 
   用户相关信息
     用户名: 必须的且唯一的
     密码: 必须的
     年龄
     电话
     爱好: 可以有多个
     时间: 包含创建时间和更新时间的对象, 时间默认值为当前时间
     相关信息: 可以任意类型
 */
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  pwd:{
    type:String,
    required:true
  },
  age:Number,
  phone:String,
  likes:{
    type:Array,
    default:[]
  },
  time:{
    create_time:{
      type:Date,
      default:Date.now
    },
    update_time: {
      type: Date,
      default: Date.now
    }
  },
  info:mongoose.SchemaTypes.Mixed
})

const UserModel = mongoose.model('users',userSchema)

function testAdd(){
  const user = {
    name: 'damu2',
    pwd: md5('123'),
    age: 23,
    sex: '男',
    phone: '13712341234',
    likes: ['吃吃吃', '睡睡睡', '喝喝喝'],
    info: '看着不像女的'
  }
  const user2 = {
    name: 'sadamu2',
    pwd: md5('234'),
    age: 23,
    sex: '男',
    phone: '13312341234',
    likes: ['吃吃吃', '睡睡睡', '喝喝喝'],
    info: '本人男爱好女'
  }

  // UserModel.create(user).then(
  //   userDoc=>{
  //     console.log('保存成功',userDoc)
  //   },
  //   error => {
  //     console.log('保存失败',error)
  //   }
  // )

  // new UserModel(user2).save().then(
  //   userDoc => {
  //     console.log('保存成功2', userDoc)
  //   },
  //   error => {
  //     console.log('保存失败2', error)
  //   }
  // )

  UserModel.create([user,user2]).then(
    userDocs=>{
      console.log('保存成功',userDocs)
    },
    error => {
      console.log('保存失败',error)
    }
  )

}

//testAdd()
//testQuery()

//测试查询
function testQuery() {
  UserModel.findOne({age:21}).then(
    userDoc => {
      console.log('查询成功1',userDoc)
    },
    error => {
      console.log('查询失败1',error)
    }
  )

  UserModel.find({age: 21}).then(
    userDocs => {
      console.log('查询成功2', userDocs)
    },
    error => {
      console.log('查询失败2', error)
    }
  )

  UserModel.find({age: 23},{pwd:0}).then(
    userDocs => {
      console.log('查询成功3', userDocs)
    },
    error => {
      console.log('查询失败3', error)
    }
  )

}

//测试更新

//testUpdate()
function testUpdate() {
  UserModel.update({age:23},{info:'atguigu'},{multi:true}).then(
    doc => {
      console.log('更新成功',doc)
    },
    error => {
      console.log('更新失败',error)
    }
  )
}

//测试删除

//testDelete()
function testDelete() {
  UserModel.remove({age: {$lt:24} }).then(
    doc => {
      console.log('删除成功',doc)
    },
    error => {
      console.log('删除失败',error)
    }
  )
}