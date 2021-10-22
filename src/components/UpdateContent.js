import React, { Component } from 'react';

class UpdateContent extends Component {
    render() {
      console.log("UpdateContent is rended");
      return(
        <article>
          <h2>Update</h2>
          <form action="update_process" method="post"
            onSubmit={function(e){
              e.preventDefault();
              this.props.onSubmit(
                e.target.id.value,
                e.target.title.value,
                e.target.desc.value
              );
              e.target.id.value = "";
              e.target.title.value = "";
              e.target.desc.value = "";

            }.bind(this)}
          >
            <p><input type="text" name="id" placeholder="id"></input></p>
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p><textarea name="desc" placeholder="description"></textarea></p>
            <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }
  }


  export default UpdateContent;