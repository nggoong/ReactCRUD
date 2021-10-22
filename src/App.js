// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Practice from './components/Practice';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';




//props값이나 state값이 바뀌면 그 state값을 가지고 있는 컴포넌트의 render()가 다시 실행됨.
//render() 하위의 컴포넌트들도 각자 render()가지고있고 다 다시 호출..
//화면이 다시 그려짐


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3 //UI에 상관없는 애들은 state 값으로 안넣으면 됨.
    this.idForDelete = null;
    this.tempArr = [];
    this.state = {
      mode:'create',
      selected_content_id : 2,
      welcome:{title:'Welcome', desc:'Hello, React!'},
      subject:{title:'WEB', sub:'world wide web!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is hyperText'},
        {id:2, title:'CSS', desc:'CSS is hyperText'},
        {id:3, title:'JAVASCRIPT', desc:'JAVASCRIPT is hyperText'}
      ],
      
    }
  }
  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'read') {
      var i = 0;
      while(i< this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode ==='create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
      let _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc})
      this.setState({contents: _contents});
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode === 'update') {
      _article = <UpdateContent onSubmit={function(_id ,_title, _desc){
        let tempData = Array.from(this.state.contents);
        tempData[Number(_id)-1] = {id:Number(_id), title: _title, desc:_desc};
        this.setState({contents:tempData});
      }.bind(this)}></UpdateContent>
    }
    else if(this.state.mode === 'delete') {
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
      this.tempArr.splice(this.idForDelete-1, 1);
      for(let i = this.idForDelete; i<this.tempArr.length; i++) {
        this.tempArr[i].id = this.tempArr[i].id + 1;
        this.setState({contents:this.tempArr});
        console.log(this.state.contents);
      }
    }

    return _article;
  }
  render() {
    
    return (
      <div className="App">
        hello react!!
        <Subject title= {this.state.subject.title}
                sub={this.state.subject.sub}
                onChangePage={function(){
                  this.setState({mode:'welcome'})
                }.bind(this)}
                >

        </Subject>
        <TOC onChangePage = {function(id){
            this.setState(
              { mode:'read',
                selected_content_id:Number(id)
            });
          }.bind(this)}data={this.state.contents}
          onClick={function(_id){
            this.idForDelete = Number(_id);
            this.tempArr = Array.from(this.state.contents);
            console.log(this.idForDelete);
            console.log(this.tempArr);
            // for(let i = this.idForDelete-1; i<tempArr.length; i++) {
            //   tempArr[i].id = tempArr[i].id - 1;
            // }
            // this.setState({contents:tempArr});
          }.bind(this)}></TOC>
          <Control onChangeMode = {function(_mode){
            this.setState({
              mode:_mode,
            })
          }.bind(this)}></Control>
        {this.getContent()}
        <Practice para = "this is props and props name is para.."></Practice>
      </div>
    );
  }
}
 

export default App;
