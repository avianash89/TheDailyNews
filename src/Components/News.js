import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c0a3a5e872324ce7959a0898abb26188&page=${page}&pageSize=${props.pageSize}`;
      // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - DailyNews`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c0a3a5e872324ce7959a0898abb26188&page=${
        page + 1
      }&pageSize=${props.pageSize}`;
      // https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}
      setPage(page + 1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error('Error fetching more news:', error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        DailyNews - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0} // Guard against undefined articles
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles &&
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title : ''}
                      description={element.description ? element.description : ''}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired, // Ensure apiKey is passed as a prop
  setProgress: PropTypes.func.isRequired, // Ensure setProgress is passed as a prop
};

export default News;
