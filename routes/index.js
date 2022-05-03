var express = require('express');
var router = express.Router();
const Post = require("../models/posts")


router.get('/', async function (req, res, next) {
  const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
  const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
  const post = await Post.find(q).sort(timeSort);
  res.status(200).json({
    status: "success",
    post
  })
})

router.post('/', async function (req, res, next) {
  try {
    const data = req.body;
    if (data.content !== '') {
      const newPost = await Post.create(data)

      res.status(200).json({
        status: 'success',
        newPost
      })
    } else {
      res.status(400).json({
        status: "false",
        message: "內文不能空白"
      })
    }
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: "姓名未填寫或錯誤"
    })
  }
})

router.patch('/:id', async function (req, res, next) {
  try {
    const id = req.params.id
    const name = req.body.name
    const content = req.body.content
    const newPost = await Post.findByIdAndUpdate(id)
    if (!newPost) {
      res.status(400).json({
        status: 'false',
        message: '無此id'
      })
    } else {
      const newPost = await Post.findByIdAndUpdate(
        id,
        {
          name,
          content
        },
        {
          new: true,
          runValidators: true
        }//修改成功後回傳修改結果，跑驗證
      )

      res.status(200).json({
        status: 'success',
        newPost
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: '無此id'
    })
  }
})

router.delete('/', async function (req, res, next) {

  const DeleteAll = await Post.deleteMany({})

  res.status(200).json({
    status: 'success',
    DeleteAll
  })
})

router.delete('/deletone/:id', async function (req, res, next) {
  try {
    const id = req.params.id
    const deleteOne = await Post.findById(id)
    if (!deleteOne) {
      res.status(400).json({
        status: 'false',
        message: '無此id'
      })
    } else {
      const deleteOne = await Post.findByIdAndDelete(id)
      res.status(200).json({
        status: 'success',
        deleteOne
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: '無此id'
    })
  }
})

module.exports = router;