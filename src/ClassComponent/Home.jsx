import React, { Component } from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from "react-infinite-scroll-component";
export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            totalResults: 0
        }
    }
    getAPIData = async () => {
        var response = ""

        if (this.props.search)
            response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search}&page=1&pagesize=100&language=${this.props.language}&apiKey=96106e73f5354808b328bad2e5450210`)
        else
            response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&page=1&pagesize=100&language=${this.props.language}&apiKey=96106e73f5354808b328bad2e5450210`)
        var result = await response.json()
        this.setState({
            articles: result.articles,
            totalResults: result.totalResults,
            page: 1
        })
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        var response = ""

        if (this.props.search)
            response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search}&page=${this.state.page}&pagesize=100&language=${this.props.language}&apiKey=96106e73f5354808b328bad2e5450210`)
        else
            response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&page=${this.state.page}&pagesize=100&language=${this.props.language}&apiKey=96106e73f5354808b328bad2e5450210`)
        var result = await response.json()
        this.setState({ articles: this.state.articles.concat(result.ar) })
    }
    componentDidMount() {
        this.getAPIData()
    }
    componentDidUpdate(oldprops) {
        if (this.props !== oldprops) {
            this.getAPIData()
        }
    }
    render() {
        return (
            <>
                <div className='container-fluid mt-1'>
                    
                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length < this.state.totalResults}
                            loader={<h4>Loading...</h4>}
                        >
                        <div className='row'>
                            <h5 className='background text-light text-center p-2'>{this.props.q} News Section</h5>
                            {
                                this.state.articles.map((item, index) => {
                                    return <Newsitem
                                        key={index}
                                        pic={item.urlToImage}
                                        title={item.title}
                                        description={item.description}
                                        source={item.source.name}
                                        date={item.publishedAt}
                                        url={item.url}
                                    />
                                })
                            }
                            </div>
                        </InfiniteScroll>
                    
                </div>
            </>
        )
    }
}
