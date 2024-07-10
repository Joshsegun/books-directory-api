const Books = require("./../models/bookModel");
const catchAsync = require("./../utils/catchAsync");
const ErrorHandler = require("./../utils/errorHandler");

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Books.find().sort({ name: 1 });

  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Books.findById(req.params.id);

  if (!book)
    return next(
      new ErrorHandler("The Book with the given id can not be found", 404)
    );

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  //Creating
  const book = await Books.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      book,
    },
  });
});

module.exports.updateBook = catchAsync(async (req, res, next) => {
  //Updating
  const book = await Books.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) return next(new ErrorHandler("No Book with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

module.exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Books.findByIdAndDelete(req.params.id);

  if (!book) return next(new ErrorHandler("No Book with that ID", 404));

  res.status(204).json({
    status: "success",
    message: "File deleted from the database",
    data: null,
  });
});
