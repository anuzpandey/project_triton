<?php 
session_start();
if (!isset($_SESSION['user_logged'])){
	header('Location:index.php?loginfirst=yes');
}

?>
<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Triton School, College">
        <meta name="keywords" content="Triton">
        <meta name="author" content="Anuz Pandey">
        <!-- Title -->
        <title>Triton - Notice > Update Notice</title>
        <!-- Styles -->
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
        <link href="../assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="../assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <link href="../assets/plugins/icomoon/style.css" rel="stylesheet">
        <link href="../assets/plugins/uniform/css/default.css" rel="stylesheet" />
        <link href="../assets/plugins/switchery/switchery.min.css" rel="stylesheet" />
        <link href="../assets/plugins/nvd3/nv.d3.min.css" rel="stylesheet">
        <link href="../assets/plugins/switchery/switchery.min.css" rel="stylesheet" />
        <link href="../assets/plugins/dropzone/dropzone.min.css" rel="stylesheet">
        <link href="../assets/plugins/plupload/js/jquery.plupload.queue/css/jquery.plupload.queue.css" rel="stylesheet" type="text/css" />
        <!-- Theme Sty -->
        <link href="../assets/css/triton.css" rel="stylesheet">
        <link href="../assets/css/themes/admin.css" rel="stylesheet">
        <link href="../assets/css/custom.css" rel="stylesheet">
    </head>
<?php 

if(isset($_GET['file']))
{
	?>
	<script type="text/javascript">

		alert("Invalid File Format selected..!!!");
	</script>
	<?php
}
require_once('../connection.php');
if(isset($_GET['id'])){
	$id=$_GET['id'];
	$query_check = "SELECT * FROM tbl_wlcmMsg WHERE msg_id='$id'";
	$result = $conn->query( $query_check );
	while($data = $result->fetch_array())
	{
		?>
		<body>
			<div class="container">
				<form lpformnum="1" class="form-control" method="POST" enctype = "multipart/form-data">
					<fieldset>
						<legend>Update Message</legend>

						<div class="form-group">
							<input type="hidden" name="id" value="<?php echo $data['msg_id']?>"/>
							<input type="hidden" name="oldFile" value="<?php echo $data['image']?>"/>

							<label for="exampleInputEmail1">Welcome Message</label>
							<textarea type="text" required="required" name="welcomeMsg" class="form-control" id="" aria-describedby=""  style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;"><?php echo $data['msg']; ?></textarea> 

						</div>
						
						<div class="form-group">
							<label for="exampleInputFile">Image</label>
							<input type="file" name="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
							<small id="fileHelp" class="form-text text-muted">If you want to update Cover Image for Welcome Message, Upload from here.</small>
						</div>

					</fieldset>
					<button type="submit" name="update" class="btn btn-primary">Update</button>
				</fieldset>
			</form>
		</div>
	</body>
	<?php
}
}
?>
</html>
<?php 

if(isset($_POST['update'])){
	
	$welcomeMsg = $_POST['welcomeMsg'];	
	$id=$_POST['id'];
	
	if($_FILES['file']['name'] == TRUE){
		$oldFile=$_POST['oldFile'];

		$fname = $_FILES['file']['name'];
		$ext = pathinfo($fname, PATHINFO_EXTENSION);
		$date= date('Y=m-d H:i:s');

		$new_name = md5(uniqid($date,true))."_Triton.".$ext;

		if($ext=='gif'|| $ext =='png' || $ext=='jpg'){

			move_uploaded_file($_FILES['file']['tmp_name'],'welcomeMessageImage/'.$new_name);

			unlink("welcomeMessageImage/".$oldFile);

			$update= "UPDATE tbl_wlcmMsg SET msg='$welcomeMsg',  image='$new_name' WHERE msg_id='$id'";

			$conn->query($update);

			header("location:welcomeMessage.php?update=success");
		}else{
			header("location:updateWelcomeMsg.php?file=fail");
		}
	}else{
		$update= "UPDATE tbl_wlcmMsg SET msg='$welcomeMsg'WHERE msg_id='$id'";
		$conn->query($update);
		header("location:welcomeMessage.php?update=success");
	}

}
?>