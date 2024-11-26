import React from 'react'

const NewsItem=(props)=> {
   
        let {title ,description,imageUrl,articleUrl,author,publishedAt,source}=props;
        
 
        return  (
            <div className="card my-3" style={{width: ""}}>
            <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(publishedAt).toLocaleString()}</small></p>
                    <a href={articleUrl} className="btn btn-sm w-23 btn-primary" target='_blank' rel="noreferrer">Read More</a> 
                 
                          <span className="position-absolute  translate-start badge  bg-danger" style={{top: "0px",left: "0PX"}}>
                            {source}
                          </span>
                      
                </div>             
        </div>
        )
    
}

export default NewsItem