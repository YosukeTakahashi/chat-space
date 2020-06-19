$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="chat-main__message-list__userid" data-message-id=${message.id}>
        <div class="chat-main__message-list__userid__user-talk">
          <div class="chat-main__message-list__userid__user-talk__talker">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__userid__user-talk__talk-date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__userid__user-Chat">
          <p class="Message__content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
      </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message-list__userid" data-message-id=${message.id}>
        <div class="chat-main__message-list__userid__user-talk">
          <div class="chat-main__message-list__userid__user-talk__talker">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__userid__user-talk__talk-date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__userid__user-Chat">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});      
      $('form')[0].reset();
      $('.submit-btn').prop('disabled',false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});