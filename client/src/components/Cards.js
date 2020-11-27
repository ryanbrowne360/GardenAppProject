import React from "react"


function Cards(props){
    return(

<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{props.name}</h5>
    <p class="card-text">{props.description}</p>
    <a href="#" class="btn btn-primary">{props.viewdetails}</a>
  </div>
</div>

    );
}