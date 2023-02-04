<template>
    <header>
        <h2>
            <label for="nav-toggle">
                <span class="fa fa-bars"></span>
            </label>
    
        {{page_name }}
        </h2>
    
        <div class="search-wrapper">
            <span class="fa fa-search"></span>
            <input type="search" name="" placeholder="Search here" />
        </div>
    
        <div class="user-wrapper">
            <img src="../assets/noimage.jpg" width="40px" height="40px" alt="">
            <div>
                <h4>John Doe</h4>
                <small>Super admin</small>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'Header',
   

}
</script>