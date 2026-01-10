const dummy = blogs => 1

const totalLikes = blogs => {
    let likesCount = blogs.reduce((count,blog)=>count+=blog.likes, 0)
    return likesCount
}

export{
    dummy,
    totalLikes
}