<template>
        <b-container class="bv-example-row text-light" align-v="center">
            <div class="d-flex justify-content-center">
            <h1>Our Team</h1>
            </div>
        <b-row class="text-center">
            <b-col cols="6">
                <b-img thumbnail fluid
                class="border border-info profImg" 
                rounded="circle" 
                src="https://res.cloudinary.com/denxksv9e/image/upload/v1623829399/GuyZaidman_xqszsw.jpg" 
                alt="Image 1"
                width="250"
                height="250">
                </b-img><br>
                <a href="https://www.linkedin.com/in/guy-zaidman-51bb43154/"><font-awesome-icon :icon="['fab', 'linkedin']" class="linkedIcon" /></a>
            </b-col>
            <b-col cols="5" class='d-flex align-items-center'>
                <div>
                    <b>Guy Zaidman</b><br>
                    Mazkeret Batya, Israel<br>
                    Third year student of Software and Information Systems, Ben-Gurion University
                </div>
            </b-col>
            <b-col></b-col>
        </b-row>

        <b-row class="text-center">
            <b-col></b-col>
            <b-col cols="5" class='d-flex align-items-center'>
                <div>
                    <b>Jonathan Milver</b><br>
                    Beer Sheva, Israel<br>
                    Third year student of Software and Information Systems, Ben-Gurion University
                </div>
            </b-col>
            <b-col cols="6">
                <b-img thumbnail fluid
                 class="border border-info profImg" 
                 rounded="circle" 
                 src="https://res.cloudinary.com/denxksv9e/image/upload/v1623829524/WhatsApp_Image_2021-06-16_at_10.44.37_efcvwo.jpg" 
                 alt="Image 1"
                 width="250"
                 height="250"
                 >
                 </b-img><br>
                 <a href="https://www.linkedin.com/in/jonatan-milver-518443186/"><font-awesome-icon class="linkedIcon" :icon="['fab', 'linkedin']" /></a>
            </b-col>
        </b-row>
        <hr class="rounded">
        <div class="d-flex justify-content-center">
            <h1>Projects</h1>
        </div>
        <b-row class="text-center">
            <b-col>
            </b-col>
            <b-col cols="5">
                <h5>Pacman</h5>
                <a class="project" href="https://web-development-environments-2021.github.io/Assignment2_315934257_312252919/">
                    <b-img thumbnail fluid
                    class="border border-info profImg" 
                    rounded="circle" 
                    src="https://res.cloudinary.com/denxksv9e/image/upload/v1623930678/Pac-Man-Logo-min-removebg-preview_xtyhlz.png" 
                    alt="Image 1"
                    width="250"
                    height="250"
                    >
                    </b-img>
                </a>
            </b-col>
            <b-col>
            </b-col>
        </b-row>
        <b-row>
            <b-col  cols="5">
                <h5>Guy's - third age website</h5>
                <a class="project" href="https://web-development-environments-2021.github.io/312252919/">
                    <b-img thumbnail fluid
                    class="border border-info profImg" 
                    rounded="circle" 
                    src="https://res.cloudinary.com/denxksv9e/image/upload/v1623931212/guygrandparents_s726ju.png" 
                    alt="Image 1"
                    width="250"
                    height="250"
                    >
                    </b-img>
                </a>
            </b-col>
            <b-col> 
            </b-col>
            <b-col>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col  cols="5">
                <h5>Jonathan's - third age website</h5>
                <a class="project" href="https://web-development-environments-2021.github.io/315934257/">
                    <b-img thumbnail fluid
                    class="border border-info profImg" 
                    rounded="circle" 
                    src="https://res.cloudinary.com/denxksv9e/image/upload/v1623931421/jacob_ce4ck2.png" 
                    alt="Image 1"
                    width="250"
                    height="250"
                    >
                    </b-img>
                </a>
            </b-col>
        </b-row>
        </b-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.bv-example-row{
    max-width: 80%;
}
.profImg:hover{
    filter: brightness(50%);
    transition: 0.6s;
}
.linkedIcon{
    transform:scale(1.3)
}
.linkedIcon:hover{
    transform:scale(1.7);
}
hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
.project{
    color: whitesmoke;
}
</style>