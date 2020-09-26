exports.getPosts = (req, res, next) => {
    res.status(200).json({
      posts: [
        {
          _id: '1',
          title: 'Web Development',
          image:'',
          name: 'complete web development by angela',
          description:'full stack development course',
          rating:'',
          
        },
        {
            _id: '1',
            title: 'Web Development',
            name: 'complete web development by angela',
            description:'full stack development course',
            rating:'',
  
            
          },
          {
            _id: '1',
            title: 'Web Development',
            name: 'complete web development by angela',
            description:'full stack development course',
            rating:'',
  
            
          }
      ]
    });
  };