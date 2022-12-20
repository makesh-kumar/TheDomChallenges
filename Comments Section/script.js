const comments = [];
const container = document.querySelector('#container');
generateDOM(container, comments);

function generateComment(source, comment, isSub) {
  const container = document.createElement('div');
  if (isSub) {
    container.classList.add('sub-comment');
  }
  container.classList.add('comment');

  container.addEventListener('click', onEventClick);
  container.setAttribute('id', comment.id);
  const sectionOne = document.createElement('section');
  const sectionTwo = document.createElement('section');

  const inputText = document.createElement('input');
  inputText.setAttribute('value', comment.message);
  inputText.setAttribute('id', comment.id);
  inputText.setAttribute('readonly', true);
  inputText.addEventListener('input', onMessageChange);

  const updateBtn = document.createElement('button');
  updateBtn.textContent = 'Update';
  updateBtn.setAttribute('class', 'hide');

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.setAttribute('class', 'hide');

  const likeBtn = document.createElement('button');
  likeBtn.textContent = 'Like';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  const commentBtn = document.createElement('button');
  commentBtn.textContent = 'Comment';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';

  if (comment.isLiked) {
    likeBtn.textContent = 'Unlike';
    likeBtn.classList.add('like');
  }
  if (comment.isEditActive) {
    editBtn.classList.toggle('disabled');
    updateBtn.classList.toggle('hide');
    cancelBtn.classList.toggle('hide');
  }
  if (!comment.isInputDisabled) {
    inputText.toggleAttribute('readonly');
  }

  if (comment.isFocus) {
    inputText.classList.add('blue-border');
    inputText.focus({ focusVisible: true });
  }

  const subDiv = document.createElement('div');
  const selector = 'subComment';
  subDiv.setAttribute('id', selector);

  sectionOne.appendChild(inputText);
  sectionOne.appendChild(updateBtn);
  sectionOne.appendChild(cancelBtn);

  sectionTwo.appendChild(likeBtn);
  sectionTwo.appendChild(editBtn);
  sectionTwo.appendChild(commentBtn);
  sectionTwo.appendChild(deleteBtn);

  container.appendChild(sectionOne);
  container.appendChild(sectionTwo);
  container.appendChild(subDiv);

  source.appendChild(container);
}

function generateDOM(main, commentsToRender, isSub) {
  if (!main) {
    main = container;
  }
  if (!commentsToRender) {
    commentsToRender = comments;
  }
  if (!isSub) {
    main.innerHTML = '';
  }

  for (const comment of commentsToRender) {
    generateComment(main, comment, isSub);
    if (comment.subComments.length) {
      const ele = main?.querySelector('#' + comment.id);
      generateDOM(ele.lastChild, comment.subComments, true);
    }
  }
}

function reset() {
  function resetComments(comments) {
    for (const comment of comments) {
      comment.isEditActive = false;
      comment.isFocus = false;
      comment.isInputDisabled = true;
      if (comment.subComments.length) {
        resetComments(comment.subComments);
      }
    }
  }
  resetComments(comments);
}

function onEventClick(e) {
  e.stopPropagation();
  const id = e.currentTarget.getAttribute('id');
  const action = e.target.innerHTML;
  const comment = getComment(comments, id);
  switch (action) {
    case 'Like':
    case 'Unlike':
      comment.isLiked = !comment.isLiked;
      generateDOM();
      break;
    case 'Edit':
      reset();
      comment.isEditActive = true;
      comment.tempMessage = comment.message;
      comment.isInputDisabled = false;
      comment.isFocus = true;
      generateDOM();
      break;

    case 'Update':
      if (
        !comment.tempMessage ||
        !comment.tempMessage.toString().trim().length
      ) {
        alert('Please enter some message');
        return;
      }

      comment.isEditActive = false;
      comment.isInputDisabled = true;
      comment.isFocus = false;
      if (comment.tempMessage) {
        comment.message = comment.tempMessage.toString().trim();
      }
      comment.tempMessage = '';
      generateDOM();
      break;

    case 'Cancel':
      comment.isEditActive = false;
      comment.isInputDisabled = true;
      comment.isFocus = false;
      comment.message = comment.message;
      comment.tempMessage = '';
      generateDOM();
      break;
    case 'Comment':
      reset();

      generateDOM();
      generateTemCommentSection(id);
      break;
    case 'Delete':
      deleteComment(comments, id);
      generateDOM();
      break;
  }
}

function deleteComment(comments, id) {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment.id === id) {
      if (
        confirm(
          `Are you sure you want to delete this comment ${
            comment.subComments.length
              ? `
            • Note - All the replies to this comment also will be deleted`
              : ``
          }`
        )
      ) {
        comments.splice(i, 1);
      }
      break;
    } else if (comment.subComments.length) {
      deleteComment(comment.subComments, id);
    }
  }
}

function generateTemCommentSection(id) {
  const ele = container?.querySelector('#' + id);

  const input = document.createElement('input');
  input.setAttribute('value', '');
  input.setAttribute('placeholder', 'Add a reply');
  input.setAttribute('id', 'temp-' + id);
  input.addEventListener('input', onMessageChange);
  input.classList.add('blue-border');

  const button = document.createElement('button');
  button.textContent = 'Reply';
  button.setAttribute('id', id);
  button.addEventListener('click', onReply);

  const div = document.createElement('div'); //
  div.classList.add('reply');

  div.appendChild(input);
  div.appendChild(button);
  ele.appendChild(div);
}

function onReply(e) {
  const id = e.currentTarget.getAttribute('id');
  replyMsg = e.target.previousElementSibling.value;
  if (!replyMsg || !replyMsg.toString().trim().length) {
    alert('Please enter some message');
    return;
  }

  const comment = getComment(comments, id);
  const newReply = {
    message: replyMsg,
    tempMessage: '',
    isLiked: false,
    subComments: [],
    id: 'id' + Date.now() + Math.floor(Math.random() * 11),
    isEditActive: false,
    isInputDisabled: true,
    isFocus: false,
  };
  comment.subComments.push(newReply);
  generateDOM();
}
function onMessageChange(e) {
  const id = e.currentTarget.getAttribute('id');
  const msg = e.target.value;
  const comment = getComment(comments, id);
  if (comment) {
    comment.tempMessage = msg;
  }
}

function getComment(comments, id) {
  for (const comment of comments) {
    let result;
    if (comment.id === id) {
      result = comment;
    } else if (comment.subComments.length) {
      result = getComment(comment.subComments, id);
    }
    if (result) {
      return result;
    }
  }
}

const newComment = document.querySelector('#new-comment');
const addNewComment = document.querySelector('.add-new-comment');
document.querySelector('#add').addEventListener('click', () => {
  if (addNewComment.classList.contains('hide')) {
    reset();
    generateDOM();
    addNewComment.classList.remove('hide');
  }
});
document.querySelector('#cancel-new').addEventListener('click', () => {
  newComment.value = null;
  addNewComment.classList.add('hide');
});

document.querySelector('#add-new').addEventListener('click', (e) => {
  if (!newComment.value || !newComment.value.toString().trim().length) {
    alert('Please enter some message');
    return;
  }
  const comment = {
    message: newComment.value.toString().trim(),
    tempMessage: '',
    isLiked: false,
    subComments: [],
    id: 'id' + Date.now() + Math.floor(Math.random() * 11),
    isEditActive: false,
    isInputDisabled: true,
    isFocus: false,
  };
  newComment.value = '';
  addNewComment.classList.add('hide');
  comments.push(comment);
  generateDOM();
});
