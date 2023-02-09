
import React, { Component } from 'react';
import './styles.css';


import { Posts } from '../../components/posts';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/button';
import { TextInput } from '../../components/textInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: '',
  };



  async componentDidMount() { // esse componente vai ser executado assim que o componente for executado na tela 
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      ...this.state,
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts,

    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ ...this.state, posts, page: nextPage })
  }

  handleInputChange = (e) => {
    const value = e.currentTarget.value;
    this.setState({ ...this.state, searchValue: value });
  }


  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => { return post.title.toLowerCase().includes(searchValue.toLowerCase()); }) : posts;
    return (
      <section className='container'>
        <div class="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

          <TextInput anctionFn={this.handleInputChange} inputValue={searchValue} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts =(</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>

      </section>
    );
  }
}

//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}


