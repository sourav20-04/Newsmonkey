import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import '../App.css';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  // Default props if not provided
  const [state, setState] = useState({
    articles: [],   // Store all articles
    loading: true,   // Loading state for initial load and when fetching more data
    page: 1,         // Page counter to manage pagination
    totalResults: 0, // Total number of results (to know when to stop fetching)
    pageSize: 10,    // Number of articles per page (can be adjusted)
  });

  // Capitalize first letter of the category
  const Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  document.title = `${Capitalize(props.category)} - NewsMonkey`;

  // Fetch articles from API
  const fetchArticles = async (page) => {
    const apiKey = process.env.REACT_APP_API_KEY;  // Ensure API key is set in .env
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${state.pageSize}`;

    try {
    // Log the API request URL

      if (page === 1) {
        props.setProgress(30);  // Start loading progress bar      
      }

      setState((prevState) => ({ ...prevState, loading: true }));

      const data = await fetch(url);
      const parsedData = await data.json();

      // Ensure that articles are returned
      if (parsedData && parsedData.articles && Array.isArray(parsedData.articles)) {
        props.setProgress(60);

        const validArticles = parsedData.articles.filter((article) => {
          return article.title && article.description && article.urlToImage;
        });

        let updatedArticles;
        if (page === 1) {
          updatedArticles = validArticles;
        } else {
          updatedArticles = [...state.articles, ...validArticles];
        }

        console.log("Updated Articles: ", updatedArticles); // Log the updated articles

        setState((prevState) => ({
          ...prevState,
          articles: updatedArticles,
          loading: false,
          totalResults: parsedData.totalResults,
          page: page,
        }));

        props.setProgress(100); // Finish progress bar
      } else {
        console.error("API response does not contain 'articles'.", parsedData);
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        props.setProgress(0);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      props.setProgress(0);
    }
  };

  // Fetch more data for infinite scrolling
  const fetchMoreData = () => {
    const newPage = state.page + 1;
    if (newPage <= Math.ceil(state.totalResults / state.pageSize)) {
      fetchArticles(newPage);
    }
  };

  // Fetch initial articles when component is mounted
  useEffect(() => {
    console.log("Fetching initial articles...");
    fetchArticles(state.page);
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <>
      <div className="container my-2">
        <h2 className="text-center">
          NewsMonkey - Top {Capitalize(props.category)} Headlines
        </h2>

        {/* Display loading state */}
        {state.loading && <div>Loading...</div>}

        <InfiniteScroll
          dataLength={state.articles.length}  // Number of articles already loaded
          next={fetchMoreData}  // Function to fetch more data when user scrolls down
          hasMore={state.articles.length < state.totalResults}  // Check if more articles are available
          loader={<div className="spinner-container"><span className="spinner"></span> Loading...</div>}  // Loading spinner
          endMessage={<p style={{ textAlign: 'center' }}>No more articles to load.</p>}  // Message when all data is loaded
        >
          <div className="row">
            {
              state.articles.length > 0 ?
                state.articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      articleUrl={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                )) :
                <p>No articles found!</p> // Display message if no articles
            }
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

// Default props
News.defaultProps = {
  category: 'general',
};

// PropTypes validation
News.propTypes = {
  category: PropTypes.string,
};

export default News;
