import React, { useState } from "react";
import useGetCurrentOrganization from "@/src/requests/organizations/useGetCurrentOrganization";
import { Separator } from "@/src/components/shadcn/Separator";
import { Button } from "@/src/components/shadcn/Button";
import { UpdateIcon } from "@radix-ui/react-icons";
import useUpdateOrganization from "@/src/requests/organizations/useUpdateOrganization";

const OrgPage = () => {
  const { data: organization, isLoading, isError } = useGetCurrentOrganization();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedName, setUpdatedName] = useState(organization?.title || "");
  const mutation = useUpdateOrganization();

  const handleUpdateClick = () => {
    // Set updatedName to the current organization title
    setUpdatedName(organization?.title || ""); 
    setIsUpdating(true);
  };

  const handleCancelUpdate = () => {
    // Reset updatedName to the current organization title
    setIsUpdating(false);
  };

  const handleSaveUpdate = async () => {
    // Update the organization title
    try {
      // Wait for the promise to resolve
      const mutationResult = await mutation; 

      // Call the mutateAsync function to update the organization title
      await mutationResult.mutateAsync({ 
        body: {
          title: updatedName,
        },
        organizationId: organization?.id || "",
      });

      setIsUpdating(false); 

      // Reload the page after updating -- This ensures that it is displaying the most up-to-date organization
      window.location.reload();

      // If there is an error, log it to the console
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };
  
  // If the organization is loading, display a loading message
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // If there is an error loading the organization, display an error message
  if (isError) {
    return <p>Error loading organization data</p>;
  }

  return (
    <div>
      {/* Button to update the organization name */}
      <div className="flex justify-between items-center mb-2">
        <h3>Organization</h3>
        <Button className="gap-1" onClick={handleUpdateClick}>
          Update Organization <UpdateIcon />
        </Button>
      </div>
      <Separator />
      {isUpdating ? (
        <div>
          {/* Allow the user to update the org name -- highlight the text box */}
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border-2 border-indigo-900 p-1 focus:outline-none focus:border-indigo-900"
          />
          {/* Save and Cancel buttons */}
          &nbsp;<Button onClick={handleSaveUpdate}>Save</Button>&nbsp;
          <Button onClick={handleCancelUpdate}>Cancel</Button>
        </div>
      ) : (
        <div>
          {/* Display the organization name -- Have a white border so the name stays in place */}
          <p className="border-2 border-white p-1 focus:outline-none focus:border-white">
            {organization?.title}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrgPage;
